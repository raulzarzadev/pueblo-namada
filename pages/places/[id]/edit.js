import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FormPlace from "../../../components/FormPlace";
import PrivatePage from "../../../components/HOC/PrivatePage";
import { listenPlace } from "../../../firebase/places";

export default function EditPlace() {

  const [place, setPlace] = useState(undefined);
  const { query: { id: placeId } } = useRouter()

  useEffect(() => {
    listenPlace(placeId, setPlace)
  }, [])

  if (place === undefined) return <div>Cargando ...</div>

  return (
    <PrivatePage permissionTo="public">
      <div>
        <h1 className="text-2xl font-bold text-center my-2">Editar Lugar</h1>
        <FormPlace place={place} editing />
      </div>
    </PrivatePage>
  )
}