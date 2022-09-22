import useSortByField from '@/hooks/useSortByField'
import { Dates } from 'firebase-dates-util'
import { useState } from 'react'
import sortByDate from '../../utils/sortByDate'
import { CurrencySpan } from '../CurrencySpan'
import { PaymentDetails } from '../Guests/Guest/GuestPayments'
import Modal from '../Modal'

const PaymentsTable = ({ payments }) => {
  const { arraySorted: sortedPayments, handleSortBy } =
    useSortByField(payments)
  console.log(sortedPayments)
  return (
    <div>
      <h2 className='font-bold text-center'>Pagos</h2>
      <table className='mx-auto w-full'>
        <thead>
          <tr>
            <th>
              <button onClick={() => handleSortBy('name')}>
                Guest
              </button>
            </th>
            <th>
              <button onClick={() => handleSortBy('name')}>
                Check-in
              </button>
            </th>
            <th>
              <button onClick={() => handleSortBy('name')}>
                Check-out
              </button>
            </th>
            <th>
              <button onClick={() => handleSortBy('name')}>
                Creted at
              </button>
            </th>
            <th>
              <button onClick={() => handleSortBy('name')}>
                Payment
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedPayments.map((payment) => (
            <PaymentRow
              key={payment.id}
              payment={payment}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const PaymentRow = ({ payment }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  const { dates } = payment

  return (
    <tr
      className=' cursor-pointer hover:bg-base-200'
      onClick={() => handleOpen()}
    >
      <Cell className='max-w-[75px] truncate'>
        {guest?.name}
        {payment && (
          <Modal
            title={`Pago de ${guest?.name}`}
            open={open}
            handleOpen={handleOpen}
          >
            <h2 className='font-bold'>{guest?.name}</h2>
            <PaymentDetails
              payment={payment}
              place={payment?.place}
            />
            {/* <GuestDetails place={place} guest={guest} /> */}
          </Modal>
        )}
      </Cell>
      <Cell className='text-xs'>
        {dates &&
          Dates.format(
            dates?.startsAt || dates?.starts,
            'dd MMM yy'
          )}
      </Cell>
      <Cell className='text-xs'>
        {dates &&
          Dates.format(
            dates?.endsAt || dates?.ends,
            'dd MMM yy'
          )}
      </Cell>
      <Cell className='text-xs'>
        {Dates.fromNow(payment?.createdAt)}
        {/* {formatDistance(new Date(payment?.createdAt), new Date(), { addSuffix: true })} */}
      </Cell>
      <Cell>
        <CurrencySpan value={payment.mxnTotal} />
      </Cell>
    </tr>
  )
}
const Cell = ({ children, className = '' }) => {
  return (
    <td
      className={`${className} px-2 py-1 text-center items-center relative`}
    >
      {children}
    </td>
  )
}

export default PaymentsTable
