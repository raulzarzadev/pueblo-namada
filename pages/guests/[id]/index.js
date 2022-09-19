import { useEffect, useState } from 'react'
import FormGuest from '../../../components/FormGuest'
export default function Guest() {
  const [guest, setGuest] = useState(undefined)

  useEffect(() => {
    const storageGuest = localStorage.getItem('guest-edit')
    if (storageGuest) {
      setGuest(JSON.parse(storageGuest))
    }
    return () => {
      localStorage.removeItem('guest-edit')
    }
  }, [])

  if (!guest) return <div>Cargando...</div>
  return (
    <div>
      <h1 className="text-center font-bold border">Huesped</h1>
      <FormGuest guest={guest} />
    </div>
  )
}
