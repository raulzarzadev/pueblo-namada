import { format, addDays } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createAccommodation, updateAccommodation } from "../../firebase/Accommodations/main";
//import { newAccommodation } from "../../firebase/accomodations";
import { formatDate } from "../../utils/dates";
import InputDate from "../inputs/date";
import InputNumber from "../inputs/InputNumber";
import Text from "../inputs/text";

export default function FormAccommodation({ guest, guests = [], place, payment = null }) {

  const defaultGuestId = guest?.id || null
  const defaultValues = {
    ...payment, dates: {
      ...payment?.dates,
      //startsAt: payment?.accommodationStarts
    }
  } || {
    guest: defaultGuestId,
    nights: 1,
    discountedNights: 0,
    dates: {
      startsAt: `${format(new Date(), "yyyy-MM-dd")}`
    }
    // accommodationStarts: `${format(new Date(), "yyyy-MM-dd")}`,
  }
  console.log(defaultValues)
  const { register, handleSubmit, watch, setValue, reset, formState } = useForm(
    {
      defaultValues
    }
  );

  const FORM_STATUS = {
    0: 'Pagar',
    1: 'Pagado',
    2: 'Cancelado',
    3: 'Guardando',
    4: 'Editar',
    5: 'Editado'
  }

  console.log(watch(), payment)

  const defaultLabel = payment ? FORM_STATUS[4] : FORM_STATUS[0]
  const [labelSave, setLabelSave] = useState(defaultLabel);


  const startsAt = watch('dates.startsAt')
  const nights = watch('nights')
  useEffect(() => {
    setValue('dates.endsAt', accommodationEnds(startsAt))
    setTotals(getTotals())
  }, [startsAt, nights])


  const onSubmit = data => {
    const accomodation = {
      ...data,
      place: place?.id,
      placeId: place?.id,
      mxnTotal: totals?.mxn,
      usdTotal: totals?.usd,
      prices: {
        night: place?.price || null,
        usd: place?.usdPrice || null,
      },
    }
    setLabelSave(FORM_STATUS[3])


    payment
      ?
      updateAccommodation(payment.id, accomodation)
        .then(res => {
          console.log('payment updated', { id: payment.id })
          setLabelSave(FORM_STATUS[5])
          setTimeout(() => {
            setLabelSave(FORM_STATUS[4])
            //router.back()
            // reset()
          }, 1000)
        })
      :
      createAccommodation(accomodation)
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


  const accommodationEnds = (startAt) => {
    const nights = watch('nights') || 1
    const startDate = new Date(startAt)
    const endDate = addDays(startDate, nights)
    return formatDate(endDate, "yyyy-MM-dd")
  }

  //  console.log(place)

  const [totals, setTotals] = useState({ mxn: 0, usd: 0 })
  const getTotals = () => {
    const price = parseFloat(place?.price || 0)
    const usdPrice = parseFloat(place?.usdPrice || 0)
    const discountedNights = parseInt(watch('discountedNights') || 0)
    const nights = parseInt(watch('nights') || 0)
    const mxn = (price * nights - (discountedNights * price)).toFixed(2)
    const usd = (usdPrice && (price * nights - (discountedNights * price)) / usdPrice).toFixed(2)
    return { mxn: parseFloat(mxn), usd: parseFloat(usd) }
  }


  return (
    <div className="p-1">
      <form onSubmit={handleSubmit(onSubmit)}>
        {!!guests.length &&
          <div>
            <label >
              <span>Huesped:</span>
              <select defaultValue='' {...register('guest')} className='input select input-bordered my-2'>
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
                  {` $${parseFloat(place?.usdPrice).toFixed(2)}mxn`}
                </span>
              </p>
            </div>
            <div className="sm:flex justify-center text-center">
              <InputDate
                type='date'
                label='Desde'
                {...register('dates.startsAt',
                  {
                    value: format(new Date(watch('dates.startsAt') || new Date()), 'yyyy-MM-dd')
                  })}
              />
              <InputDate
                type='date'
                label='Hasta'
                disabled
                {...register('dates.endsAt',
                  {
                    value: accommodationEnds(startsAt)
                  })}
              />
            </div>
            <div className="flex justify-end flex-col items-end">
              <InputNumber
                type='number' {...register('nights', { valueAsNumber: true })}
                label={'Noches'}
                smallSize
                sideLabel
                min={0}
                max={99}
              />
              <InputNumber
                type='number'
                {...register('discountedNights', { valueAsNumber: true })}
                label={'Descuento (noches)'}
                smallSize
                sideLabel
                min={0}
                max={99}
              />
            </div>
            <div className="text-center">
              <p className="">Total (mxn):
                <span className="font-bold text-xl">
                  {`$${totals?.mxn}`}
                </span>
              </p>

              <p className="">
                Total (usd) :
                <span className="font-bold text-xl">
                  {`$${totals?.usd}`}
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