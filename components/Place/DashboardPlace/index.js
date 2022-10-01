import { useEffect, useState } from 'react'

import Section from 'comps/Section'

import HostRoomRequestSection from '../HostRoomRequestSection'
import { useSelector } from 'react-redux'
import { selectPlaceState } from '@/store/slices/placeSlice'

import { listenPlaceAccommodations } from '@firebase/Accommodations/main'

import { listenPlaceGuests } from '@firebase/Gests/main'
import {
  formatGuestFromRoomRequests,
  formatGuestPayments,
  guestFromAccomodationAndPayemts
} from './utils'
import { useUser } from 'comps/context/userContext'
import GuestsTable from '../GuestsTable'
import PlaceDetails from '../PlaceDetails'
import GuestsCards from './GuestsCards'
import ManagePlace from './ManagePlace'

export default function DashboardPlace ({
  showTable = false,
  showCards = false,
  showPaymentsTable = false,
  showOperatingCosts = false,
  showPlaceRequests = true,
  showPlaceDetails = false,
  showManagePlace = true
}) {
  const { user } = useUser()
  const place = useSelector(selectPlaceState)
  const isOwner = place?.userId === user?.uid

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
    const guestsFromRoomRequests =
      formatGuestFromRoomRequests({
        roomRequests: place.roomRequests
      })

    const guestsFromPlaceAndPayments =
      guestFromAccomodationAndPayemts({
        guests,
        payments: placePayments
      })
    const formatedGuestsPayments = formatGuestPayments({
      guests: [
        ...guestsFromPlaceAndPayments,
        ...guestsFromRoomRequests
      ]
    })

    setFormatedGuest(formatedGuestsPayments)
  }, [guests.length, placePayments.length])

  // if (!showGuest()) return <div>Cannot see the guests</div>

  return (
    <div className=''>
      {/* <FormPlaceConfig place={ place } /> */ }
      {/* <Options place={place} formatedGuest={formatedGuest} /> */ }
      <div>
        <h1 className='text-xl'>{ place?.name }</h1>
      </div>
      <div className='grid gap-4'>

        { showPlaceRequests &&
          <HostRoomRequestSection />
        }

        { showCards &&
          <GuestsCards guests={ formatedGuest } />
        }

        { showTable &&
          <Section title='Guests'>
            <GuestsTable
              guests={ formatedGuest }
              payments={ placePayments }
              place={ place }
            />
          </Section>
        }

        { showManagePlace && <Section title={ 'Manage place' }>
          <ManagePlace />
        </Section> }

        { showPlaceDetails &&
          <Section
            title={ 'Place details' }
            subtitle={ `${place?.name || ''}` }
            sticky
          >
            <PlaceDetails />
          </Section> }



        {/* {showPaymentsTable && (
          <Section title='Payments'>
            <PaymentsTable payments={placePayments} />
          </Section>
        )} */}

        {/* {showOperatingCosts && (
          <Section title='Costs'>
            <PlaceCosts place={place} />
          </Section>
        )} */}

      </div>
    </div>
  )
}
