import Image from "next/image";
import { useUser } from '@comps/context/userContext'
import { deletePlace } from "../../firebase/places";
import { useRouter } from "next/router";
import Link from "next/link";
import GuestsHistory from "../GuestsHistory";

export default function PlaceDetails({ place }) {
  const { user } = useUser()
  const router = useRouter()
  const owner = place?.userId === user?.uid
  const handleDeletePlace = (id) => {
    deletePlace(id).then(res => {
      if (res) router.push('/places')
    })
  }
  const placeString = JSON.stringify(place)
  console.log(placeString);
  const handleEdit = () => {
    localStorage.setItem('edit-place', placeString)
    router.push(`/places/${place.id}/edit`)
  }
  return (
    <div className=" mx-auto">
      <figure className="relative w-full h-52" >
        <Image src='https://api.lorem.space/image/movie?w=200&h=280' layout="fill" objectFit="contain" />
      </figure>

      <h1 className="text-2xl font-bold text-center">{place.name}</h1>

      {owner &&
        <div className="grid gap-4 grid-flow-col my-2 max-w-sm mx-auto">
          <Link href={`/places/${place.id}/new-guest`}>
            <button className="btn btn-primary btn-sm" >
              Nuevo huesped
            </button>
          </Link>
          <button className="btn btn-error btn-sm" disabled>
            Eliminar
          </button>
          <button className="btn btn-info btn-sm" onClick={() => handleEdit()}>
            Editar
          </button>
        </div>
      }


      <div className="max-w-md mx-auto">
        <p className="text-center">{place.contact}</p>
        <p className="my-2 p-1">{place.resume}</p>
        <h2 className="text-xl font-bold">Reglamento</h2>
        <p className="p-1 whitespace-pre-line">{place.rules}</p>
        <h2 className="text-xl font-bold">Recomendaciones de la casa</h2>
        <p className="p-1 whitespace-pre-line">{place.recomendations}</p>
      </div>

      {!!user &&
        <GuestsHistory place={place} owner={owner} />
      }
    </div>
  )
}