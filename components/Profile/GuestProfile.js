import RequestsTable from 'comps/Place/RequestsTable'
import Section from 'comps/Section'
import { useEffect, useState } from 'react'
import { listenUserRequests } from '../../firebase/RoomRequests/main'
const GuestProfile = () => {
  const [userRequests, setUserRequests] =
    useState(undefined)

  useEffect(() => {
    listenUserRequests(setUserRequests)
  }, [])
  return (
    <div>
      <Section title={ 'My rooms requests' } subtitle={ `(${userRequests?.length})` }>
        <RequestsTable requests={ userRequests } showPlaceName />
      </Section>
    </div>
  )
}

export default GuestProfile
