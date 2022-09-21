import { useEffect, useState } from 'react'
import FormSelfAccommodation from '../FormSelfAccomodation'
import Modal from '../Modal'
import RequestsTable from './RequestsTable'
import { useUser } from '../context/userContext'
import { listenUserPlaceRoomRequests } from '../../firebase/RoomRequests/main'
import TextInfo from '../TextInfo'

const GuestRoomRequestSection = ({ place }) => {
  const {
    user: { guestProfile, name, email, id }
  } = useUser()
  const [openAccomodationForm, setOpenAccomodationForm] = useState(false)
  const handleOpen = () => {
    setOpenAccomodationForm(!openAccomodationForm)
  }
  const guestInfo = { ...guestProfile, name, email, id }
  const { requests } = place
  const [userRequests, setUserRequests] = useState([])
  useEffect(() => {
    listenUserPlaceRoomRequests(place.id, setUserRequests)
  }, [])

  // console.log(userRequests)
  console.log({ place, id })

  return (
    <div>
      <button className="btn btn-primary btn-sm" onClick={() => handleOpen()}>
        stay here
      </button>
      <div>
        <h4>My accommodations in this place</h4>
        <RequestsTable
          requests={userRequests}
          isPlaceOwner={id === place.userId}
        />
      </div>
      <Modal
        title="Stay here"
        open={openAccomodationForm}
        handleOpen={handleOpen}>
        <div className="">
          <DefaultGuestInfo guest={guestInfo} />
          <FormSelfAccommodation place={place} guest={guestInfo} />
        </div>
      </Modal>
    </div>
  )
}

const DefaultGuestInfo = ({ guest }) => {
  return (
    <div className="my-4">
      <h4 className="font-bold text-lg">Guest info</h4>

      <TextInfo
        text={`  This informations will be sent to the host. The host will decide if this
        information is enough`}
      />
      <div>{guest.name}</div>
      <div>{guest.email}</div>
      <div>{guest.phone}</div>
      <div>{guest.plates}</div>
    </div>
  )
}

export default GuestRoomRequestSection
