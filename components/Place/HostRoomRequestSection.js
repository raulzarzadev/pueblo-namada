import { useEffect, useState } from 'react'
import FormSelfAccommodation from '../FormSelfAccomodation'
import Modal from '../Modal'
import RequestsTable from './RequestsTable'
import { useUser } from '../context/userContext'
import { listenPlaceRoomRequests } from '../../firebase/RoomRequests/main'
import Section from '../Section'

const HostRoomRequestSection = ({ place }) => {
  const {
    user: { guestProfile, name, email, id }
  } = useUser()
  const [openAccomodationForm, setOpenAccomodationForm] = useState(false)
  const handleOpen = () => {
    setOpenAccomodationForm(!openAccomodationForm)
  }
  const guestInfo = { ...guestProfile, name, email, id }
  const { requests } = place
  const [placeRequests, setplaceRequests] = useState([])
  useEffect(() => {
    listenPlaceRoomRequests(place.id, setplaceRequests)
  }, [])

  // console.log(placeRequests)
  const totalRequests = placeRequests.length
  const unsolvedRequests = placeRequests.filter(
    ({ status }) => status === 'UNSOLVED'
  ).length
  console.log({ place, id })
  return (
    <Section
      title={'Room requests'}
      subtitle={`Total: ${totalRequests} Unsolved: ${unsolvedRequests}`}>
      <div>
        <h4>My accommodations in this place</h4>
        <RequestsTable
          requests={placeRequests}
          isPlaceOwner={id === place.userId}
        />
      </div>
    </Section>
  )
}

export default HostRoomRequestSection
