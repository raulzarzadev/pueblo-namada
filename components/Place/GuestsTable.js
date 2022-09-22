import { useState } from 'react'
import { CurrencySpan } from '../CurrencySpan'
import { GuestDetails } from '../Guests/Guest/GuestDetails'
import Modal from '../Modal'

const GuestsTable = ({ guests, payments, place }) => {
  return (
    <table className="mx-auto w-full">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Placas</th>
          <th>Pagos</th>
          <th>Ultimo</th>
        </tr>
      </thead>

      <tbody>
        {guests?.map((guest, i) => (
          <GuestRow
            guest={guest}
            place={place}
            key={guest + i}
            payments={payments.filter((pay) => pay.guest === guest.id)}
          />
        ))}
      </tbody>
    </table>
  )
}

const GuestRow = ({ place, guest, payments }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)
  const sortedPayments = payments.sort((a, b) => {
    const toNumber = (date) => {
      const newDate = new Date(date)
      if (newDate instanceof Date) {
        return newDate?.getTime()
      } else {
        console.error('invalid date')
      }
    }
    if (toNumber(a?.createdAt) > toNumber(b?.createdAt)) return 1
    if (toNumber(a?.createdAt) < toNumber(b?.createdAt)) return -1
    return 0
  })

  const lastPay = sortedPayments[0]
  return (
    <>
      <tr
        className="cursor-pointer hover:bg-base-200"
        onClick={() => handleOpen()}>
        <Cell className=" truncate max-w-[75px]   ">
          <span className="">{guest?.name}</span>
          <Modal
            title={`Información de ${guest?.name} `}
            open={open}
            handleOpen={handleOpen}>
            <GuestDetails place={place} guest={guest} />
          </Modal>
        </Cell>
        <Cell>{guest?.plates}</Cell>
        <Cell>{payments?.length}</Cell>
        <Cell>
          {lastPay ? (
            <>
              {/*  <div className="text-xs text-right">
                {lastPay?.createdAt && formatDate(lastPay?.createdAt, 'dd MMM yy')}
              </div> */}
              <div className="">
                <CurrencySpan value={lastPay?.mxnTotal} />
              </div>
            </>
          ) : (
            <span className="text-xs">Sin pagos aún</span>
          )}
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
    <td className={`${className} px-2 py-1 text-center items-center relative`}>
      {children}
    </td>
  )
}

export default GuestsTable
