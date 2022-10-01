import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import { selectPlaceState } from '@/store/slices/placeSlice'
import ModalRequestDetails from 'comps/Place/RequestsTable/ModalRequestDetails'
import { createCashBalance } from '@firebase/CashBalanceV2/main'
import FORM_STATUS from '@/CONSTANTS/FORM_STATUS'

const FormCashBalance = () => {
  const place = useSelector(selectPlaceState)
  const { handleSubmit, register, watch } = useForm({
    defaultValues: {
      from: format(new Date(), "yyyy-MM-dd'T'00:00"),
      to: format(new Date(), "yyyy-MM-dd'T'HH:mm")
    }
  })


  const onSubmit = (data) => {
    // console.log('save', data)
  }

  const [datesRequests, setDatesRequests] = useState([])


  const handleSetDatesRequests = async (from, to) => {
    setSaveLabel(FORM_STATUS.save)
    const balanceDates =
      { from: new Date(from).getTime(), to: new Date(to).getTime() }

    const acceptedRequestsBettwenDates = () => place.roomRequests.filter(({ createdAt, status }) => {

      const isAccepted = status === 'ACCEPTED'
      const isInDates = createdAt < balanceDates.to && createdAt > balanceDates.from
      return isAccepted && isInDates
    })
    const res = acceptedRequestsBettwenDates()
    setDatesRequests(res)
  }

  const [saveLabel, setSaveLabel] = useState(FORM_STATUS.save)

  const handleSaveCashBalance = () => {
    setSaveLabel(FORM_STATUS.saving)
    createCashBalance({
      dates: {
        from: watch('from'),
        to: watch('to')
      },
      requests: datesRequests,
      place: {
        name: place.name,
        id: place.id,
      },

    }).then(res => {
      console.log(res)
      setSaveLabel(FORM_STATUS.saved)
    })
  }

  return (
    <div>
      <form
        onSubmit={ handleSubmit(onSubmit) }
        className='relative '
      >
        <div className='flex justify-end my-2'>
          <label>
            Desde:
            <input
              className='input input-sm input-bordered'
              type='datetime-local'
              { ...register('from') }
            />
          </label>
        </div>

        <div className='flex justify-end my-2'>
          <label>
            Hasta:
            <input
              className='input input-sm input-bordered'
              type='datetime-local'
              { ...register('to') }
            />
          </label>
        </div>

        <div className='grid gap-2 my-4'>
          <button
            onClick={ () =>
              handleSetDatesRequests(
                watch('from'),
                watch('to')
              )
            }
            className='btn  btn-outline '
          >
            Calculate cash balace
          </button>
          <button
            disabled={ saveLabel === FORM_STATUS.saved }
            className='btn '
            onClick={ () => {
              handleSaveCashBalance()
            } }>
            { `${saveLabel} cash balance` }
          </button>
        </div>
      </form>

      <CashBalance requests={ datesRequests } />
    </div>
  )
}

const CashBalance = ({ requests }) => {

  const getTotals = (requests) => {
    const mxnTotal = requests.reduce((prev, curr) => {
      return prev += curr.mxnTotal
    }, 0)
    const usdTotal = requests.reduce((prev, curr) => {
      return prev += curr.usdTotal
    }, 0)
    return { mxnTotal, usdTotal }
  }

  return <div>
    <div className='my-2 rounded-md bg-base-200 p-1'>
      Total rooms : { requests.length }
      <table className='w-full table table-compact '>
        <thead>

          <tr>
            <th>Name</th>
            <th>Created</th>
            <th>Nights</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          { requests.map((request) => <RequestRow request={ request } key={ request.id } />) }
          <tr>
            <td></td>
            <td></td>
            <th>Total:</th>
            <td >{ getTotals(requests).mxnTotal } mxn</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <th>Total:</th>
            <td >{ getTotals(requests).usdTotal } usd</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
}

const RequestRow = ({ request }) => {
  const { usdTotal, mxnTotal, nights, guest, createdAt } = request
  const [openModal, setOpenModal] = useState()
  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  return (
    <tr key={ request.id } onClick={ () => handleOpenModal() } className='hover'>
      <td>{ guest.name }</td>
      <td>{ format(createdAt, 'dd/MM HH:mm') }</td>
      <td>{ nights }</td>
      <td>
        { mxnTotal }
        <ModalRequestDetails
          openModal={ openModal }
          handleOpenModal={ handleOpenModal }
          request={ request }
        />
      </td>
    </tr>)
}

export default FormCashBalance
