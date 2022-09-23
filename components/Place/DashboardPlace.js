import { useEffect, useState } from 'react'
// import { listenPlacePayments } from '@firebase/accomodations";
import FormAccommodation from 'comps/FormAccommodation'
import FormCashBalance from 'comps/FormCashBalance'
import FormCost from 'comps/FormCost'
import GuestCard from 'comps/Guests/Guest/GuestCard'
import MainModal from 'comps/Modal/MainModal'
import Section from 'comps/Section'
import PlaceCosts from './PlaceCosts'
import FormGuest from 'comps/FormGuest'
import PaymentsTable from 'comps/Payments/PaymentsTable'
import RequestsTable from './RequestsTable'
import GuestsTable from './GuestsTable'
import { useUser } from '../context/userContext'
import FormPlaceConfig from '../FormPlaceConfig'
import GuestRoomRequestSection from './GuestRoomRequestSection'
import HostRoomRequestSection from './HostRoomRequestSection'
import { useSelector } from 'react-redux'
import { selectPlaceState } from '@/store/slices/placeSlice'

import { listenPlaceAccommodations } from '@firebase/Accommodations/main'
import { listenPlaceGuests } from '@firebase/Gests/main'

export default function DashboardPlace({
  showTable = false,
  showCards = false,
  showPaymentsTable = false,
  showOperatingCosts = false,
  showPlaceRquests = true
}) {
  const { user } = useUser()
  const place = useSelector(selectPlaceState)
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
  const [guests, setGuests] = useState([])
  const [placePayments, setPlacePayments] = useState([])
  const [formatedGuest, setFormatedGuest] = useState([])

  useEffect(() => {
    listenPlaceAccommodations(place.id, setPlacePayments)
  }, [])
  useEffect(() => {
    listenPlaceGuests(place.id, setGuests)
  }, [])

  useEffect(() => {
    const newGuestsList = [...guests].map((guest) => {
      const guestPayments = placePayments?.filter(
        (pay) => pay?.guest === guest?.id
      )
      const sortedPaymentsByDate = [...guestPayments]?.sort(
        (a, b) => {
          const toNumber = (date) => {
            const newDate = new Date(date)
            if (newDate instanceof Date) {
              return newDate?.getTime()
            } else {
              console.error('invalid date')
            }
          }
          if (
            toNumber(a?.createdAt) > toNumber(b?.createdAt)
          )
            return 1
          if (
            toNumber(a?.createdAt) < toNumber(b?.createdAt)
          )
            return -1
          return 0
        }
      )
      return {
        ...guest,
        payments: sortedPaymentsByDate,
        lastPayment: sortedPaymentsByDate?.[0],
        lastPaymentDate:
          sortedPaymentsByDate?.[0]?.createdAt,
        paymentsLength: sortedPaymentsByDate.length
      }
    })
    setFormatedGuest(newGuestsList)
  }, [guests.length, placePayments.length])

  if (!showGuest()) return <div>Cannot see the guests</div>

  return (
    <div className=''>
      <FormPlaceConfig place={place} />
      <div>
        <h3 className='text-xl font-bold text-left my-4'>
          Options
        </h3>
        <div className='grid gap-2 sm:flex justify-evenly'>
          <MainModal
            title={'New Payment'}
            OpenComponentType='primary'
            buttonLabel='New Payment'
          >
            <FormAccommodation
              place={place}
              guests={formatedGuest}
            />
          </MainModal>
          <MainModal
            title={'New Guest'}
            OpenComponentType='primary'
            buttonLabel='New Guest'
          >
            {/* <FormPlace place={place} /> */}
            <FormGuest />
          </MainModal>
          <MainModal
            title='New cost'
            buttonLabel='New cost'
            OpenComponentType='primary'
          >
            <div>
              <FormCost place={place} />
            </div>
          </MainModal>
          <MainModal
            title={'Cash Balance'}
            OpenComponentType='primary'
            buttonLabel='Cash Balance'
          >
            <FormCashBalance place={place} />
          </MainModal>
        </div>
      </div>

      <div className='grid gap-4 py-4 mt-4'>
        {showCards &&
          formatedGuest?.map((guest, i) => (
            <GuestCard
              key={`${guest.id}-${i}`}
              guest={guest}
              isOwner={isOwner}
              place={place}
            />
          ))}

        {showTable && (
          <Section title='Guests'>
            <GuestsTable
              guests={formatedGuest}
              payments={placePayments}
              place={place}
            />
          </Section>
        )}

        {/* {showPaymentsTable && (
          <Section title='Payments'>
            <PaymentsTable payments={placePayments} />
          </Section>
        )} */}

        {showOperatingCosts && (
          <Section title='Costs'>
            <PlaceCosts place={place} />
          </Section>
        )}
        {showPlaceRquests && (
          <HostRoomRequestSection place={place} />
        )}
      </div>
    </div>
  )
}
