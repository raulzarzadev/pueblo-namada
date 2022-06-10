import { formatDistance } from "date-fns";
import { useEffect, useState } from "react"
import { listenPlacePayments } from "../../../firebase/accomodations";
import { listenPlaceGuests } from "../../../firebase/guests";
import { formatDate } from "../../../utils/dates";
import sortByDate from "../../../utils/sortByDate";
import { useUser } from "../../context/userContext";
import { CurrencySpan } from "../../CurrencySpan";
import GuestCard from "../../Guests/Guest/GuestCard";
import { GuestDetails } from "../../Guests/Guest/GuestDetails";
import { PaymentDetails } from "../../Guests/Guest/GuestPayments";
import Modal from "../../Modal";
import PlaceCosts from "../PlaceCosts";



export default function PlaceGuests({ place,
  showTable = false,
  showCards = false,
  showPaymentsTable = false,
  showOperatingCosts = false
}) {

  const { user } = useUser()
  const isOwner = place?.userId === user?.uid

  const showGuest = () => {
    let res = false
    // console.log(place)
    // visible si es propietario
    if (!!isOwner && place?.config?.guestsVisiblesFor?.admin) res = true

    // visible si esta registrado
    if (!!user && place?.config?.guestsVisiblesFor?.all) res = true

    // TODO visible si es huesped

    // if (place.config.guestsVisiblesFor.guest) res = true

    return res
  }
  const [guests, setGuests] = useState(undefined)
  const [placePayments, setPlacePayments] = useState(undefined)

  useEffect(() => {
    listenPlacePayments(place.id, setPlacePayments)
  }, [])
  useEffect(() => {
    listenPlaceGuests(place.id, setGuests)
  }, [])

  if (!showGuest()) return <div>Cannot see the guests</div>



  return (
    <div className="">
      <h1 className="text-center font-bold border">Huespedes</h1>

      <div className="text-sm max-w-sm mx-auto">
        {showCards &&
          guests?.map((guest, i) => <GuestCard key={`${guest.id}-${i}`} guest={guest} isOwner={isOwner} place={place} />)
        }
        {showTable &&
          <GuestsTable guests={guests} payments={placePayments} place={place} />
        }
        {showPaymentsTable &&
          <PaymentsTable place={place} guests={guests} />}
        {showOperatingCosts &&
          <PlaceCosts place={place} />
        }

      </div>
    </div>
  )
}

const PaymentsTable = ({ place, guests }) => {

  const [payments, setPayments] = useState(undefined)

  useEffect(() => {
    listenPlacePayments(place?.id, setPayments)
  }, [])

  return (
    <div>
      <h2 className="font-bold text-center">Pagos</h2>
      <table className="mx-auto w-full">
        <thead>
          <tr>
            <th>
              Huesped
            </th>
            <th>
              Entrada
            </th>
            <th>
              Salida
            </th>
            <th>
              Creado
            </th>
            <th>
              Pago
            </th>
          </tr>
        </thead>
        <tbody>
          {sortByDate(payments, 'createdAt', 'dec')?.map(payment => <PaymentRow key={payment.id} place={place} payment={payment} guests={guests} />)}
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
      onClick={() => handleOpen()}
    >
      <Cell className="max-w-[75px] truncate">
        {guest?.name}
        {payment &&
          <Modal title={`Nuevo pago de ${guest?.name}`} open={open} handleOpen={handleOpen} >
            <h2 className="font-bold">
              {guest?.name}
            </h2>
            <PaymentDetails payment={payment} />
            {/* <GuestDetails place={place} guest={guest} /> */}
          </Modal>
        }
      </Cell>
      <Cell className="text-xs">
        {dates && formatDate(dates?.starts, 'dd MMM yy')}
      </Cell>
      <Cell className="text-xs">
        {dates && formatDate(dates?.ends, 'dd MMM yy')}
      </Cell>
      <Cell className="text-xs">
        {formatDistance(new Date(payment.createdAt), new Date(), { addSuffix: true })}
      </Cell>
      <Cell>
        <CurrencySpan value={payment.mxnTotal} />


      </Cell>
    </tr>
  )
}

const GuestsTable = ({ guests, payments, place }) => {

  return (
    <table className="mx-auto w-full">
      <thead>
        <tr >
          <th>Nombre</th>
          <th>Placas</th>
          <th>Pagos</th>
          <th>Ultimo</th>
        </tr>
      </thead>

      <tbody>
        {guests?.map((guest, i) =>
          <GuestRow guest={guest} place={place} key={guest + i} payments={payments.filter(pay => pay.guest === guest.id)} />
        )}
      </tbody>
    </table>
  )
}


const GuestRow = ({ place, guest, payments }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)
  const sortedPayments = payments.sort((a, b) => {
    const toNumber = date => {
      const newDate = new Date(date)
      if (newDate instanceof Date) {
        return newDate?.getTime()
      } else {
        console.error('invalid date');
      }
    }
    if (toNumber(a?.createdAt) > toNumber(b?.createdAt)) return 1
    if (toNumber(a?.createdAt) < toNumber(b?.createdAt)) return -1
    return 0
  })

  const lastPay = sortedPayments[0]
  return (
    <>
      <tr className="cursor-pointer hover:bg-base-200" onClick={() => handleOpen()} >
        <Cell className=" truncate max-w-[75px]   ">
          <span className="">
            {guest?.name}
          </span>
          <Modal title={`Información de ${guest?.name} `} open={open} handleOpen={handleOpen} >
            <GuestDetails place={place} guest={guest} />
          </Modal>
        </Cell>
        <Cell>
          {guest?.plates}
        </Cell>
        <Cell >
          {payments?.length}
        </Cell>
        <Cell>
          {lastPay ?
            <>
              {/*  <div className="text-xs text-right">
                {lastPay?.createdAt && formatDate(lastPay?.createdAt, 'dd MMM yy')}
              </div> */}
              <div className="">
                <CurrencySpan value={lastPay?.mxnTotal} />
              </div>
            </>
            : <span className="text-xs">Sin pagos aún</span>}
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