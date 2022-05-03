import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import PlaceDetails from "../../../components/Places/PlaceDetails"
import { listenPlace } from "../../../firebase/places"

export default function Place() {
  const { query: { id }, back } = useRouter()
  const [place, setPlace] = useState(undefined)

  useEffect(() => {
    listenPlace(id, setPlace)
  }, [])
  if (place === undefined) return <div>Cargando ...</div>
  if (place === null) return <div>No existe el lugar <button onClick={() => back()}>Regresar</button></div>
  return (
    <div>
      <PlaceDetails place={place} />
    </div>
  )
}