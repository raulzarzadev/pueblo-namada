import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PrivatePage from '../../../components/HOC/PrivatePage'
import PlaceDetails from '../../../components/Place/PlaceDetails'
import { listenPlace } from '../../../firebase/Places/main'

export default function Place () {
  const {
    query: { id },
    back
  } = useRouter()
  const [place, setPlace] = useState(undefined)

  useEffect(() => {
    listenPlace(id, setPlace)
  }, [])
  if (place === undefined) return <div>Cargando ...</div>
  if (place === null) {
    return (
      <div>
        No existe el lugar <button onClick={() => back()}>Regresar</button>
      </div>
    )
  }
  return (
    <PrivatePage permissionTo="public">
      <div className="max-w-md mx-auto">
        <PlaceDetails place={place} />
      </div>
    </PrivatePage>
  )
}
