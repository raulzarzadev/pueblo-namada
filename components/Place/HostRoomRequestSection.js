import { useEffect, useState } from 'react'
import FormSelfAccommodation from '../FormSelfAccomodation'
import Modal from '../Modal'
import RequestsTable from './RequestsTable'
import { useUser } from '../context/userContext'
import { listenPlaceRoomRequests } from '../../firebase/RoomRequests/main'
import Section from '../Section'
import { useSelector } from 'react-redux'
import { selectPlaceState } from '@/store/slices/placeSlice'

const HostRoomRequestSection = () => {
  const place = useSelector(selectPlaceState)
  const {
    user: { id }
  } = useUser()

  console.log(place)

  // console.log(placeRequests)
  const { roomRequests } = place
  const totalRequests = roomRequests?.length
  const unsolvedRequests = roomRequests?.filter(
    ({ status }) => status === 'UNSOLVED'
  ).length
  return (
    <Section
      title={'Room requests'}
      subtitle={`Total: ${totalRequests} Unsolved: ${unsolvedRequests}`}
    >
      <div>
        <h4>My accommodations in this place</h4>
        <RequestsTable
          requests={roomRequests}
          isPlaceOwner={id === place.userId}
        />
      </div>
    </Section>
  )
}

export default HostRoomRequestSection
