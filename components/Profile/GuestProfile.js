import { useEffect, useState } from 'react'
import { listenUserRequests } from '../../firebase/RoomRequests/main'
import RequestsTable from '../Place/RequestsTable'
const GuestProfile = () => {
  const [userRequests, setUserRequests] =
    useState(undefined)

  useEffect(() => {
    listenUserRequests(setUserRequests)
  }, [])
  return (
    <div>
      <h2 className='text-center'>My rooms </h2>
      {userRequests?.map((req) => (
        <div key={req.id}></div>
      ))}
      <RequestsTable requests={userRequests} />
    </div>
  )
}

export default GuestProfile
