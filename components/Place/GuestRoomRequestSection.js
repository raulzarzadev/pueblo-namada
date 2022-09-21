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
          <h4 className="font-bold text-lg">Choose dates</h4>

          <TextInfo
            text={` Choose the start date, and then the numbers of days. `}
          />

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
      <span>
        <TextInfo
          text={`  This informations will be sent to the host. The host will decide if this
        information is enough`}
        />
      </span>
      <div>Name:{guest.name}</div>
      <div>Email:{guest.email}</div>
      <div>Phone:{guest.phone}</div>
      <div>Plates:{guest.plates}</div>
      <div>Image:{guest.image}</div>
      <div>ID Image:{guest.imageID}</div>
    </div>
  )
}

export default GuestRoomRequestSection
