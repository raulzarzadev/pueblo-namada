import { useEffect, useState } from 'react'
import FormSelfAccommodation from '../FormSelfAccomodation'
import Modal from '../Modal'
import RequestsTable from './RequestsTable'
import { useUser } from '../context/userContext'
import { listenUserPlaceRoomRequests } from '../../firebase/RoomRequests/main'
import TextInfo from '../TextInfo'
import Section from 'comps/Section'

const GuestRoomRequestSection = ({ place }) => {
  const {
    user: { guestProfile, name, email, id }
  } = useUser()
  const [openAccomodationForm, setOpenAccomodationForm] =
    useState(false)
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
  //  console.log({ place, id })

  return (
    <div>
      <div className='w-full flex my-5 justify-center'>
        <button
          className='btn btn-primary btn-sm'
          onClick={() => handleOpen()}
        >
          Check-in
        </button>
      </div>
      <Section
        title={'My requests in this place '}
        subtitle={` ( ${userRequests?.length} ) `}
      >
        <RequestsTable
          requests={userRequests}
          isPlaceOwner={id === place.userId}
          showPlaceName
        />
      </Section>
      <Modal
        title='Stay here'
        open={openAccomodationForm}
        handleOpen={handleOpen}
      >
        <div className=''>
          <DefaultGuestInfo guest={guestInfo} />
          <h4 className='font-bold text-lg'>
            Choose dates
          </h4>

          <TextInfo
            text={` Choose the start date, and then the numbers of days. `}
          />

          <FormSelfAccommodation
            place={place}
            guest={guestInfo}
          />
        </div>
      </Modal>
    </div>
  )
}

const DefaultGuestInfo = ({ guest }) => {
  return (
    <div className='my-4'>
      <h4 className='font-bold text-lg'>Guest info</h4>
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
