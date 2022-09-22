import { useEffect, useState } from 'react'
import { useUser } from 'components/context/userContext'
import { listenPlaces } from '@firebase/Places/main'
import PlaceCard from '../Place/PlaceCard'
export default function PlacesList() {
  const [places, setPlaces] = useState([])

  useEffect(() => {
    listenPlaces(setPlaces)
  }, [])

  const { user } = useUser()

  return (
    <div className=''>
      <h1 className='text-xl font-bold text-center my-4'>
        Lugares
      </h1>
      <div className='grid place-content-center gap-4'>
        {places.map((place) => (
          <PlaceCard
            key={place?.id}
            place={place}
            isOwner={user?.uid === place?.userId}
            linkToDashboard
          />
        ))}
      </div>
    </div>
  )
}
