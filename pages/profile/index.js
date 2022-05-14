import Link from "next/link"
import { useEffect, useState } from "react"
import PlaceCard from "../../components/Places/PlaceCard"
import { listenUserPlaces } from "../../firebase/places"

export default function Profile() {
  const [places, setPlaces] = useState(undefined)

  useEffect(() => {
    listenUserPlaces(setPlaces)
  }, [])





  return (
    <div>
      <h1 className="text-center">Perfil de usuario</h1>
      <div>
        <h2 className="text-center">Mis Lugares</h2>
        <div className="flex w-full justify-center p-2">
          <Link href='/new-place'>
            <a className="btn btn-info btn-sm">
              Nuevo lugar
            </a>
          </Link>
        </div>
        <div className="grid gap-4 max-w-lg mx-auto">
          {places?.map(place =>
            <PlaceCard place={place} linkToDashboard isOwner />)}
        </div>
      </div>
    </div>
  )
}