import { format, addDays } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { newAccommodation } from "../../firebase/accomodations";
import { formatDate } from "../../utils/dates";
import InputNumber from "../inputs/InputNumber";
import Text from "../inputs/text";

export default function FormAccommodation({ guest, guests = [], place, editing = false }) {

  const defaultGuestId = guest?.id || null
  const { register, handleSubmit, watch, setValue, reset, formState } = useForm(
    {
      defaultValues: {
        guest: defaultGuestId,
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
    const accomodation = {
      place: place.id,
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
      },
      ...data
    }
    // console.log(accomodation)
    setLabelSave(FORM_STATUS[3])
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

  return (
    <div className="p-1">
      <form onSubmit={handleSubmit(onSubmit)}>
        {!!guests.length &&
          <div>
            <label >
              <span>Huesped:</span>
              <select value={defaultGuestId} defaultValue='' {...register('guest')} className='input select input-bordered my-2'>
                <option value='' disabled >Debes seleccionar un huesped</option>
                {guests?.map(({ id, name }) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
            </label>
          </div>
        }
        {
          !!watch('guest') &&
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
            //onClick={() => onSubmit(watch())}
            >
              {labelSave}
            </button>
          </div>
        }
      </form >
    </div >
  )
}