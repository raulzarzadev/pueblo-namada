import { useEffect, useState } from "react";
import FormPlace from "../../../components/FormPlace";

export default function EditPlace() {

  const [place, setPlace] = useState(undefined);
  useEffect(() => {
    const key = localStorage.getItem('edit-place')
    setPlace(JSON.parse(key));

  }, [])

  if (place === undefined) return <div>Cargando ...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-2">Editar Lugar</h1>
      <FormPlace place={place} editing />
    </div>
  )
}