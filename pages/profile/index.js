import { useEffect, useState } from "react"
import PlaceCard from "../../components/Places/PlaceCard"
import { listenUserPlaces } from "../../firebase/places"

export default function Profile() {
  const [places, setPlaces] = useState(undefined)

  useEffect(() => {
    listenUserPlaces(setPlaces)
  }, [])

  console.log(places)


  return (
    <div>
      <h1 className="text-center">Perfil de usuario</h1>
      <div>
        <h2 className="text-center">Mis Lugares</h2>
        {places?.map(place =>
          <PlaceCard place={place} linkToDashboard />)}
      </div>
    </div>
  )
}