import { useEffect, useState } from 'react'
import { listenPlaceAccommodations } from '../../../firebase/Accommodations/main'
// import { listenPlacePayments } from "../../../firebase/accomodations";
import { listenPlaceGuests } from '../../../firebase/guests'
import sortByDate from '../../../utils/sortByDate'
import { useUser } from '../../context/userContext'
import { CurrencySpan } from '../../CurrencySpan'
import FormAccommodation from '../../FormAccommodation'
import FormCashBalance from '../../FormCashBalance'
import FormCost from '../../FormCost'
import FormPlace from '../../FormPlace'
import GuestCard from '../../Guests/Guest/GuestCard'
import { GuestDetails } from '../../Guests/Guest/GuestDetails'
import { PaymentDetails } from '../../Guests/Guest/GuestPayments'
import Modal from '../../Modal'
import MainModal from '../../Modal/MainModal'
import Section from '../../Section'
import PlaceCosts from '../PlaceCosts'
import { Dates } from '../../../firebase/Dates.utils'
import FormGuest from '../../FormGuest'
import { format } from 'date-fns'

export default function PlaceGuests({
  place,
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
    if (
      !!isOwner &&
      place?.config?.guestsVisiblesFor?.admin
    )
      res = true

    // visible si esta registrado
    if (!!user && place?.config?.guestsVisiblesFor?.all)
      res = true

    // TODO visible si es huesped

    // if (place.config.guestsVisiblesFor.guest) res = true

    return res
  }
  const [guests, setGuests] = useState(undefined)
  const [placePayments, setPlacePayments] =
    useState(undefined)

  useEffect(() => {
    listenPlaceAccommodations(place.id, setPlacePayments)
  }, [])
  useEffect(() => {
    listenPlaceGuests(place.id, setGuests)
  }, [])

  if (!showGuest()) return <div>Cannot see the guests</div>

  return (
    <div className=''>
      <div>
        <h3 className='text-xl font-bold text-left my-4'>
          Operaciones
        </h3>
        <div className='grid gap-2 sm:flex justify-evenly'>
          <MainModal
            title={'Nuevo pago'}
            OpenComponentType='primary'
            buttonLabel='Nuevo pago'
          >
            <FormAccommodation
              place={place}
              guests={guests}
            />
          </MainModal>
          <MainModal
            title={'Nuevo Huesped'}
            OpenComponentType='primary'
            buttonLabel='Nuevo Huesped'
          >
            {/* <FormPlace place={place} /> */}
            <FormGuest />
          </MainModal>
          <MainModal
            title='Nuevo gasto'
            buttonLabel='Nuevo Gasto'
            OpenComponentType='primary'
          >
            <div>
              <FormCost place={place} />
            </div>
          </MainModal>
          <MainModal
            title={'Nuevo Corte'}
            OpenComponentType='primary'
            buttonLabel='Corte'
          >
            <FormCashBalance place={place} />
          </MainModal>
        </div>
      </div>

      <div className='grid gap-4 py-4 mt-4'>
        {showCards &&
          guests?.map((guest, i) => (
            <GuestCard
              key={`${guest.id}-${i}`}
              guest={guest}
              isOwner={isOwner}
              place={place}
            />
          ))}

        {showTable && (
          <Section title='Huespedes'>
            <GuestsTable
              guests={guests}
              payments={placePayments}
              place={place}
            />
          </Section>
        )}

        {showPaymentsTable && (
          <Section title='Pagos'>
            <PaymentsTable
              place={place}
              guests={guests}
              payments={placePayments}
            />
          </Section>
        )}

        {showOperatingCosts && (
          <Section title='Costos'>
            <PlaceCosts place={place} />
          </Section>
        )}
      </div>
    </div>
  )
}

const PaymentsTable = ({ place, guests, payments }) => {
  /*   const [payments, setPayments] = useState(undefined)

    useEffect(() => {
      listenPlaceAccommodations(place?.id, setPayments)
    }, []) */

  return (
    <div>
      <h2 className='font-bold text-center'>Pagos</h2>
      <table className='mx-auto w-full'>
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
          {sortByDate(payments, 'createdAt', 'dec')?.map(
            (payment) => (
              <PaymentRow
                key={payment.id}
                place={place}
                payment={payment}
                guests={guests}
              />
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

const PaymentRow = ({ place, payment, guests }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)
  const guest = guests?.find(
    ({ id }) => id === payment?.guest
  )
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
              place={place}
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

const GuestsTable = ({ guests, payments, place }) => {
  const [sortedGuests, setSortedGuest] = useState(guests)
  const handleSortBy = (fieldName) => {
    console.log(fieldName)
    const guestTSort = [...guests]
    setSortedGuest(
      guestTSort.sort((a, b) => {
        if (a[fieldName] < b[fieldName]) return -1
        if (a[fieldName] > b[fieldName]) return 1
        return 0
      })
    )
  }
  return (
    <table className='mx-auto w-full'>
      <thead>
        <tr>
          <th>
            <button onClick={() => handleSortBy('name')}>
              Nombre
            </button>
          </th>
          <th>
            <button onClick={() => handleSortBy('plates')}>
              Placas
            </button>
          </th>
          <th>
            <button
              onClick={() => handleSortBy('payments')}
            >
              Pagos
            </button>
          </th>
          <th>
            <button
              onClick={() => handleSortBy('createdAt')}
            >
              Cantidad
            </button>
          </th>
          <th>
            <button
              onClick={() => handleSortBy('updatedAt')}
            >
              Actualizado
            </button>
          </th>
        </tr>
      </thead>

      <tbody>
        {sortedGuests?.map((guest, i) => (
          <GuestRow
            guest={guest}
            place={place}
            key={guest.id}
            payments={payments.filter(
              (pay) => pay.guest === guest.id
            )}
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
    if (toNumber(a?.createdAt) > toNumber(b?.createdAt))
      return 1
    if (toNumber(a?.createdAt) < toNumber(b?.createdAt))
      return -1
    return 0
  })

  const lastPay = sortedPayments[0]
  return (
    <>
      <tr
        className='cursor-pointer hover:bg-base-200'
        onClick={() => handleOpen()}
      >
        <Cell className=' truncate max-w-[75px]   '>
          <span className=''>{guest?.name}</span>
          <Modal
            title={`Información de ${guest?.name} `}
            open={open}
            handleOpen={handleOpen}
          >
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
              <div className=''>
                <CurrencySpan value={lastPay?.mxnTotal} />
              </div>
            </>
          ) : (
            <span className='text-xs'>Sin pagos aún</span>
          )}
          {/*   {payments.sort((a, b) => {
            const toNumber = date => date.getTime()
            if (toNumber(a.createdAt) > toNumber(b.createdAt)) return 1
            if (toNumber(a.createdAt) < toNumber(b.createdAt)) return -1
            return 0
          })} */}
        </Cell>
        <Cell>
          {console.log(guest.updatedAt)}
          {guest.updatedAt &&
            format(new Date(guest.updatedAt), 'dd MM yy')}
        </Cell>
      </tr>
    </>
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
