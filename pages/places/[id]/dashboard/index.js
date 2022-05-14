import { useRouter } from "next/router"
import { useUser } from '@comps/context/userContext'
import { useEffect, useState } from "react"
import FormPlaceConfig from "../../../../components/FormPlaceConfig"
import PlaceDetails from "../../../../components/Places/PlaceDetails"
import { listenPlace } from "../../../../firebase/places"
import PlaceGuests from "../../../../components/Places/PlaceGuests"

export default function dashboard() {
  const [place, setPlace] = useState(undefined)
  const { query: { id }, back } = useRouter()
  useEffect(() => {
    listenPlace(id, setPlace)
  }, [])

  const { user } = useUser()

  const isOwner = place?.owner === user.id

  const handleBack = () => {
    back()
  }

  if (!isOwner) return <div>
    <p className="text-center font-bold my-10">No tienes permisos para ver este lugar</p>
    <button className="btn btn-outline" onClick={() => handleBack()} >Regresar</button>
  </div>



  return (
    <div>
      <h1 className="text-center font-bold border">Dashboard</h1>

      {place &&
        <>
          <PlaceDetails place={place} />
          <FormPlaceConfig place={place} />
          <PlaceGuests place={place} showTable showPaymentsTable />
        </>

      }
    </div>)
}
