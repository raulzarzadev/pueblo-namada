import { format, addDays } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { newAccommodation } from "../../firebase/accomodations";
import { formatDate } from "../../utils/dates";
import InputNumber from "../inputs/InputNumber";
import Text from "../inputs/text";

export default function FormAccommodation({ guest, place, editing = false }) {
  const { register, handleSubmit, watch, setValue, reset, formState } = useForm(
    {
      defaultValues: {
        accommodationStarts: format(new Date(), "yyyy-MM-dd"),
      }
    }
  );


  const FORM_STATUS = {
    0: 'Pagar',
    1: 'Pagado',
    2: 'Cancelado',
    3: 'Guardando'
  }



  const defaultLabel = FORM_STATUS[0]
  const [labelSave, setLabelSave] = useState(defaultLabel);

  const onSubmit = data => {
    // console.log('pasa', data)
    setLabelSave(FORM_STATUS[3])
    const accomodation = {
      place: place.id,
      guest: guest.id, ...data,
      mxnTotal: getTotal().mxn,
      usdTotal: getTotal().usd,
      prices: {
        night: place?.price || null,
        usd: place?.usdPrice || null,

      },
      discountedNights: data.discountedNights,
      dates: {
        starts: watch('accommodationStarts'),
        ends: accommodationEnds()
      }
    }
    newAccommodation(accomodation)
      .then(res => {
        console.log('payment created', res)
        setLabelSave(FORM_STATUS[1])
        setTimeout(() => {
          setLabelSave(FORM_STATUS[0])
          //router.back()
          reset()
        }, 1000)
      })
  };

  const getTotal = () => {
    const price = parseFloat(place.price || 0)
    const usdPrice = parseFloat(place.usdPrice || 0)
    const discountedNights = parseInt(watch('discountedNights') || 0)
    const nights = parseInt(watch('nights') || 0)
    const mxn = (price * nights - (discountedNights * price)).toFixed(2)
    const usd = (usdPrice && (price * nights - (discountedNights * price)) / usdPrice).toFixed(2)
    return { mxn: parseFloat(mxn), usd: parseFloat(usd) }
  }


  const accommodationEnds = () => {
    const date = watch('accommodationStarts')
    const nights = watch('nights') || 0
    const startDate = new Date(date)
    const endDate = addDays(startDate, nights)
    return formatDate(endDate, "yyyy-MM-dd")
  }


  // TODO why handlesubmit from react hook form dont works??

  return (
    <div className="p-1">

      <form onSubmit={(e) => { console.log(e) }}>
        <div className="grid gap-1 place-content-stretch ">
          <div>
            <p className="">Precio x noche (mxn):
              <span className="font-bold">
                {` $${parseFloat(place?.price).toFixed(2)}`}
              </span>
            </p>

            <p className="">
              Precio x noche (usd):
              <span className="font-bold">
                {` $${parseFloat(place?.price) * parseFloat(place?.usdPrice || 0)}`}
              </span>
            </p>

            <p className="">
              Precio x USD:
              <span className="font-bold">
                {` $${parseFloat(place.usdPrice).toFixed(2)}mxn`}
              </span>
            </p>
          </div>
          <div className="sm:flex justify-center text-center">
            <Text type='date' label='Desde'  {...register('accommodationStarts')} />
            <Text type='date' label='Hasta' disabled value={accommodationEnds()} />
          </div>
          <div className="flex justify-end flex-col items-end">
            <InputNumber type='number' {...register('nights')} label={'Noches'} smallSize sideLabel min={0} max={99} />
            <InputNumber type='number' {...register('discountedNights')} label={'Descuento (noches)'} smallSize sideLabel min={0} max={99} />
          </div>
          <div className="text-center">
            <p className="">Total (mxn):
              <span className="font-bold text-xl">
                {`$${getTotal().mxn}`}
              </span>
            </p>

            <p className="">
              Total (usd) :
              <span className="font-bold text-xl">
                {`$${getTotal().usd}`}
              </span>
            </p>
          </div>


          <button
            type="submit"
            className="btn btn-primary"
            /* disabled={[FORM_STATUS[1], FORM_STATUS[2], FORM_STATUS[3]].includes(labelSave) || !isDirty} */
            onClick={() => onSubmit(watch())}
          >
            {labelSave}
          </button>
        </div>
      </form >
    </div >
  )
}