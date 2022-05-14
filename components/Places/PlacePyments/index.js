import { useEffect, useState } from "react"
import { listenPlaceAccomomodations } from "../../../firebase/accomodations"
import { formatDate } from "../../../utils/dates"
import SettingsIcon from "../../icons/SettingsIcon"
import MainModal from "../../Modal/MainModal"

export default function PlacePyments({ place }) {
  const [payments, setPayments] = useState(undefined)
  useEffect(() => {
    listenPlaceAccomomodations(place.id, setPayments)
  }, [])

  return (
    <div>
      <h1 className="text-center font-bold text-lg">
        Pagos
      </h1>
      <table className="mx-auto">
        <tr>
          <th>id</th>
          <th>Huesped</th>
          <th>Entrada</th>
          <th>Salida</th>
          <th>Opciones</th>
        </tr>
        {payments?.map(payment => <PaymentRow payment={payment} key={payment.id} />
        )}
      </table>
    </div>
  )
}

const PaymentRow = ({ payment }) => {
  const { id, dates, price, guest } = payment
  return (
    <tr>
      <td className="max-w-[100px] truncate">{guest}</td>
      <td className="max-w-[100px] truncate">{id}</td>
      <td>{formatDate(dates?.starts, 'dd MMM yy')}</td>
      <td>{formatDate(dates?.ends, 'dd MMM yy')}</td>
      <td>
        <MainModal>

        </MainModal>
        <button>
          <SettingsIcon />
        </button>
      </td>
    </tr>
  )
}