import useSortByField from '@/hooks/useSortByField'
import { format } from 'date-fns'
import { useState } from 'react'
import { CurrencySpan } from '../CurrencySpan'
import { GuestDetails } from '../Guests/Guest/GuestDetails'
import Modal from '../Modal'

const GuestsTable = ({ guests }) => {
  const { arraySorted: sortedGuests, handleSortBy } =
    useSortByField(guests)

  return (
    <table className='mx-auto w-full table-compact table'>
      <thead>
        <tr>
          <th>
            <button onClick={ () => handleSortBy('name') }>
              Name
            </button>
          </th>
          <th className=' text-center hidden sm:grid'>
            <button onClick={ () => handleSortBy('plates') }>
              Plates
            </button>
          </th>
          <th>
            <button
              onClick={ () => handleSortBy('paymentsLength') }
            >
              Payments
            </button>
          </th>
          <th>
            <button
              onClick={ () =>
                handleSortBy('lastPaymentDate')
              }
            >
              Last Payment
            </button>
          </th>
        </tr>
      </thead>

      <tbody>
        { sortedGuests?.map((guest, i) => (
          <GuestRow
            guest={ guest }
            key={ guest + i }
          />
        )) }
      </tbody>
    </table>
  )
}

const GuestRow = ({ guest }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)
  return (
    <>
      <tr
        className='cursor-pointer hover:bg-base-200'
        onClick={ () => handleOpen() }
      >
        <Cell className=' truncate max-w-[75px]   '>
          <span className=''>{ guest?.name }</span>
          <Modal
            title={ ` ${guest?.name || 'Guest'} information ` }
            open={ open }
            handleOpen={ handleOpen }
          >
            <GuestDetails guest={ guest } />
          </Modal>
        </Cell>
        <Cell className=' text-center hidden sm:grid'>{ guest?.plates }</Cell>
        <Cell>{ guest?.payments?.length }</Cell>

        <Cell>
          { guest?.lastPayment ? (
            <>
              <div>status: { guest.lastPayment.status }</div>
              <div>
                { guest.lastPaymentDate &&
                  format(
                    guest?.lastPaymentDate,
                    'dd/MMM/yy'
                  ) }
              </div>
              <div className=''>
                <CurrencySpan
                  value={ guest.lastPayment?.mxnTotal }
                />
              </div>
            </>
          ) : (
            <span className='text-xs'>Sin pagos aún</span>
          ) }
          {/*   {payments.sort((a, b) => {
            const toNumber = date => date.getTime()
            if (toNumber(a.createdAt) > toNumber(b.createdAt)) return 1
            if (toNumber(a.createdAt) < toNumber(b.createdAt)) return -1
            return 0
          })} */}
        </Cell>
      </tr>
    </>
  )
}
const Cell = ({ children, className = '' }) => {
  return (
    <td
      className={ `${className} px-2 py-1 text-center items-center relative` }
    >
      { children }
    </td>
  )
}

export default GuestsTable
