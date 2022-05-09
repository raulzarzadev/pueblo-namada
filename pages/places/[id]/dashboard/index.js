import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import PlaceDetails from "../../../../components/Places/PlaceDetails"
import { listenPlace } from "../../../../firebase/places"

export default function dashboard() {

  const [place, setPlace] = useState(undefined)
  const { query: { id } } = useRouter()
  useEffect(() => {
    listenPlace(id, setPlace)
  }, [])


  console.log(place)
  return (
    <div>
      <h1 className="text-center font-bold border">Dashboard</h1>
      {place &&
        <PlaceDetails place={place} />
      }
    </div>)
}