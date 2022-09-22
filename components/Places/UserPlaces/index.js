import { useEffect, useState } from 'react'
import { listenUserPlaces } from '../../../firebase/Places/main'
import PlacesList from '../PlacesList'

export default function UserPlaces() {
  const [places, setPlaces] = useState([])
  useEffect(() => {
    listenUserPlaces(setPlaces)
  }, [])

  return (
    <div>
      <PlacesList places={places} />
    </div>
  )
}
