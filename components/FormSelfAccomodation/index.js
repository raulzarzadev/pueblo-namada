import { addDays, format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputDate from '../inputs/date'
import InputNumber from '../inputs/InputNumber'
import { formatDate } from '../../utils/dates'
import { createRoomRequest } from '@firebase/RoomRequests/main'
import TextInfo from '../TextInfo'

const FormSelfAccommodation = ({ place, guest }) => {
  const defaultValues = {
    guestId: guest?.id,
    guest,
    nights: 1,
    discountedNights: 0,
    dates: {
      startsAt: `${format(new Date(), 'yyyy-MM-dd')}`
    }
  }

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues
  })

  const FORM_STATUS = {
    request: 'Request a room',
    requested: 'Room requested',
    requesting: 'Requesting room',
    payed: 'payed',
    canceled: 'Canceled',
    saved: 'Saved',
    edit: 'Edit',
    edited: 'Edited',
    requestAgain: 'Request again'
  }

  const defaultLabel = FORM_STATUS.request
  const [labelSave, setLabelSave] = useState(defaultLabel)

  const startsAt = watch('dates.startsAt')
  const nights = watch('nights')

  useEffect(() => {
    setValue('dates.endsAt', accommodationEnds(startsAt))
    setTotals(getTotals())
    setLabelSave(FORM_STATUS.requestAgain)
  }, [startsAt, nights])

  const onSubmit = (data) => {
    setLabelSave(FORM_STATUS.requesting)
    const accommodation = {
      ...data,
      place: place?.id,
      placeInfo: {
        name: place.name,
        id: place.id
      },
      placeId: place?.id,
      mxnTotal: totals?.mxn,
      usdTotal: totals?.usd,
      prices: {
        night: place?.price || null,
        usd: place?.usdPrice || null
      }
    }
    // requesst accomodation
    // requests sendende succesfuly , close and show in the main menu
    console.log(accommodation)
    // TODO change to room request collection

    createRoomRequest(accommodation)
      .then((res) => {
        setLabelSave(FORM_STATUS.requested)
      })
      .catch((err) => {
        console.error(err)
        setLabelSave(FORM_STATUS.request)
      })

    // setLabelSave(FORM_STATUS[3])

    // payment
    //   ? updateAccommodation(payment.id, accomodation).then((res) => {
    //     console.log('payment updated', { id: payment.id })
    //     setLabelSave(FORM_STATUS[5])
    //     setTimeout(() => {
    //       setLabelSave(FORM_STATUS[4])
    //       // router.back()
    //       // reset()
    //     }, 1000)
    //   })
    //   : createAccommodation(accomodation).then((res) => {
    //     console.log('payment created', res)
    //     setLabelSave(FORM_STATUS[1])
    //     setTimeout(() => {
    //       setLabelSave(FORM_STATUS[0])
    //       // router.back()
    //       reset()
    //     }, 1000)
    //   })
  }

  const accommodationEnds = (startAt) => {
    const nights = watch('nights') || 1
    const startDate = new Date(startAt)
    const endDate = addDays(startDate, nights)
    return formatDate(endDate, 'yyyy-MM-dd')
  }

  const [totals, setTotals] = useState({ mxn: 0, usd: 0 })
  const getTotals = () => {
    const price = parseFloat(place?.price || 0)
    const usdPrice = parseFloat(place?.usdPrice || 0)
    const discountedNights = parseInt(watch('discountedNights') || 0)
    const nights = parseInt(watch('nights') || 0)
    const mxn = (price * nights - discountedNights * price).toFixed(2)
    const usd = (
      usdPrice && (price * nights - discountedNights * price) / usdPrice
    ).toFixed(2)
    return { mxn: parseFloat(mxn), usd: parseFloat(usd) }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-1 place-content-stretch ">
          <div>
            <p className="">
              Precio x noche (mxn):
              <span className="font-bold">
                {` $${parseFloat(place?.price).toFixed(2)}`}
              </span>
            </p>

            <p className="">
              Precio x noche (usd):
              <span className="font-bold">
                {` $${(
                    parseFloat(place?.price) / parseFloat(place?.usdPrice)
                  ).toFixed(2) || 0
                  }`}
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
              type="date"
              label="Desde"
              {...register('dates.startsAt', {
                value: format(
                  new Date(watch('dates.startsAt') || new Date()),
                  'yyyy-MM-dd'
                )
              })}
            />
            <InputDate
              type="date"
              label="Hasta"
              disabled
              {...register('dates.endsAt', {
                value: accommodationEnds(startsAt)
              })}
            />
          </div>
          <div className="flex justify-end flex-col items-end">
            <InputNumber
              type="number"
              {...register('nights', { valueAsNumber: true })}
              label={'Noches'}
              smallSize
              sideLabel
              min={0}
              max={99}
            />
            {/* TODO add roadMate */}

            {/* <InputNumber
              type="number"
              {...register('discountedNights', { valueAsNumber: true })}
              label={'Descuento (noches)'}
              smallSize
              sideLabel
              min={0}
              max={99}
            /> */}
          </div>
          <div className="text-center">
            <p className="">
              Total (mxn):
              <span className="font-bold text-xl">{`$${totals?.mxn}`}</span>
            </p>

            <p className="">
              Total (usd) :
              <span className="font-bold text-xl">{`$${totals?.usd}`}</span>
            </p>
          </div>
          <TextInfo
            text={` You can see the status of your request in your profile or in the place profile `}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={[FORM_STATUS.requested, FORM_STATUS.requesting].includes(
              labelSave
            )}
          /* disabled={[FORM_STATUS[1], FORM_STATUS[2], FORM_STATUS[3]].includes(labelSave) || !isDirty} */
          // onClick={() => onSubmit(watch())}
          >
            {labelSave}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormSelfAccommodation
