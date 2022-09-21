import { Dates } from 'firebase-dates-util'
import { useState } from 'react'
import sortByDate from '../../utils/sortByDate'
import { CurrencySpan } from '../CurrencySpan'
import { PaymentDetails } from '../Guests/Guest/GuestPayments'
import Modal from '../Modal'

const PaymentsTable = ({ place, guests, payments }) => {
  /*   const [payments, setPayments] = useState(undefined)

    useEffect(() => {
      listenPlaceAccommodations(place?.id, setPayments)
    }, []) */

  return (
    <div>
      <h2 className="font-bold text-center">Pagos</h2>
      <table className="mx-auto w-full">
        <thead>
          <tr>
            <th>Huesped</th>
            <th>Entrada</th>
            <th>Salida</th>
            <th>Creado</th>
            <th>Pago</th>
          </tr>
        </thead>
        <tbody>
          {sortByDate(payments, 'createdAt', 'dec')?.map((payment) => (
            <PaymentRow
              key={payment.id}
              place={place}
              payment={payment}
              guests={guests}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const PaymentRow = ({ place, payment, guests }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)
  const guest = guests?.find(({ id }) => id === payment?.guest)
  const { dates } = payment

  return (
    <tr
      className=" cursor-pointer hover:bg-base-200"
      onClick={() => handleOpen()}>
      <Cell className="max-w-[75px] truncate">
        {guest?.name}
        {payment && (
          <Modal
            title={`Pago de ${guest?.name}`}
            open={open}
            handleOpen={handleOpen}>
            <h2 className="font-bold">{guest?.name}</h2>
            <PaymentDetails payment={payment} place={place} />
            {/* <GuestDetails place={place} guest={guest} /> */}
          </Modal>
        )}
      </Cell>
      <Cell className="text-xs">
        {dates && Dates.format(dates?.startsAt || dates?.starts, 'dd MMM yy')}
      </Cell>
      <Cell className="text-xs">
        {dates && Dates.format(dates?.endsAt || dates?.ends, 'dd MMM yy')}
      </Cell>
      <Cell className="text-xs">
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
    <td className={`${className} px-2 py-1 text-center items-center relative`}>
      {children}
    </td>
  )
}

export default PaymentsTable
