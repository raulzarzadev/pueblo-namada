import { format, addDays } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { newAccommodation } from "../../firebase/accomodations";
import InputNumber from "../inputs/InputNumber";
import Text from "../inputs/text";

export default function FormAccommodation({ guest, place, editing = false }) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm(
    {
      defaultValues: {
        accommodationStarts: format(new Date(), "yyyy-MM-dd"),
      }
    }
  );

  const FORM_STATUS = {
    0: 'Pagar',
    1: 'Pagado',
    2: 'Cancelado'
  }



  const defaultLabel = FORM_STATUS[0]
  const [labelSave, setLabelSave] = useState(defaultLabel);

  const onSubmit = data => {
    const accomodation = {
      place: place.id,
      guest: guest.id, ...data,
      mxnTotal: getTotal().mxn,
      usdTotal: getTotal().usd,
      discountedNights: data.discountedNights,
      dates: {
        starts: watch('accommodationStarts'),
        ends: accommodationEnds()
      }
    }
    newAccommodation(accomodation)
      .then(res => {
        console.log('place created', res)
        setLabelSave(FORM_STATUS[1])
        setTimeout(() => {
          setLabelSave(FORM_STATUS[0])
          //router.back()
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
    const fixTimseZone = startDate.setMinutes(startDate.getMinutes() + startDate.getTimezoneOffset())
    const endDate = addDays(fixTimseZone, nights)
    return format(endDate, "yyyy-MM-dd")
  }


  return (
    <div className="p-1">
      <form onSubmit={handleSubmit(onSubmit)}>
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
            <Text {...register('accommodationStarts')} type='date' label='Desde' />
            <Text value={accommodationEnds()} type='date' disabled label='Hasta' />
          </div>
          <div className="flex justify-end flex-col items-end">
            <InputNumber type='number' {...register('nights')} label={'Noches'} smallSize sideLabel />
            <InputNumber type='number' {...register('discountedNights')} label={'Descuento (noches)'} smallSize sideLabel />
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


          <button className="btn btn-primary" disabled={[FORM_STATUS[1], FORM_STATUS[2]].includes(labelSave)}>
            {labelSave}
          </button>
        </div>
      </form >
    </div >
  )
}