import Image from 'next/image'
import { useUser } from '@comps/context/userContext'
import { deletePlace } from '../../firebase/Places/main'
import { useRouter } from 'next/router'
import Link from 'next/link'
import MainModal from '../Modal/MainModal'
import Section from '../Section'
import { useState } from 'react'
import Modal from '../Modal'
import FormSelfAccommodation from '../FormSelfAccomodation'

export default function PlaceDetails ({ place = {} }) {
  const { user } = useUser()
  const router = useRouter()
  const isOwner = place?.userId === user?.uid

  const handleDeletePlace = () => {
    deletePlace(place.id).then((res) => {
      if (res) router.push('/places')
    })
  }

  const handleEdit = () => {
    const placeString = JSON.stringify(place)
    localStorage.setItem('edit-place', placeString)
    router.push(`/places/${place.id}/edit`)
  }

  const alreadyInDashboard = router.pathname.includes('/dashboard')
  const { image } = place

  const isGuest = user?.profileType?.isGuest
  return (
    <div className=" mx-auto  relative">
      {image && (
        <figure className="relative w-full h-52">
          <Image src={image} layout="fill" objectFit="contain" />
        </figure>
      )}

      <h1 className="text-2xl font-bold text-center">{place.name}</h1>

      {isGuest && <StayHere place={place} />}

      {isOwner && (
        <div className="grid gap-4 sm:grid-flow-col px-2 my-2 max-w-lg mx-auto">
          {!alreadyInDashboard && (
            <Link href={`/places/${place.id}/dashboard`}>
              <button className="btn btn-outline btn-sm">Dashboard</button>
            </Link>
          )}
          <Link href={`/places/${place.id}/new-guest`}>
            <button className="btn btn-primary btn-sm">Nuevo huesped</button>
          </Link>
          <MainModal
            buttonLabel="Eliminar"
            title="Eliminar lugar"
            OpenComponentProps={{ className: 'btn btn-error btn-sm' }}>
            <div className="flex justify-center flex-col items-center">
              <h2>¿Eliminar lugar de forma permanente?</h2>
              <div className="my-4">
                <button
                  className="btn btn-error btn-sm"
                  onClick={handleDeletePlace}>
                  Eliminar
                </button>
              </div>
            </div>
          </MainModal>
          <button className="btn btn-info btn-sm" onClick={() => handleEdit()}>
            Editar
          </button>
        </div>
      )}

      <div className="max-w-md mx-auto pb-12 grid gap-2 ">
        <p className="text-center">{place.contact}</p>
        <p className="my-2 p-1 whitespace-pre-line">{place.resume}</p>
        {place?.amenities && (
          <Section title="Amenidades" sticky open>
            <p className="mb-2  whitespace-pre-line">{place?.amenities}</p>
          </Section>
        )}
        {place.rules && (
          <Section title="Reglamento" sticky>
            <p className="p-1 whitespace-pre-line">{place.rules}</p>
          </Section>
        )}
        {place?.recomendations && (
          <Section title="Recomendaciones" sticky>
            <p className="p-1 whitespace-pre-line">{place.recomendations}</p>
          </Section>
        )}
      </div>
    </div>
  )
}

const StayHere = ({ place }) => {
  const {
    user: { guestProfile, name, email, id }
  } = useUser()
  const [openAccomodationForm, setOpenAccomodationForm] = useState(false)
  const handleOpen = () => {
    setOpenAccomodationForm(!openAccomodationForm)
  }
  const guestInfo = { ...guestProfile, name, email, id }
  return (
    <div>
      <button className="btn btn-primary btn-sm" onClick={() => handleOpen()}>
        stay here
      </button>
      <Modal
        title="Stay here"
        open={openAccomodationForm}
        handleOpen={handleOpen}>
        <div className="">
          <DefaultGuestInfo guest={guestInfo} />
          <FormSelfAccommodation place={place} guest={guestInfo} />
        </div>
      </Modal>
    </div>
  )
}
const DefaultGuestInfo = ({ guest }) => {
  return (
    <div className="my-4">
      <h4 className="font-bold text-lg">Defaul guest info</h4>
      <div>{guest.name}</div>
      <div>{guest.email}</div>
      <div>{guest.phone}</div>
      <div>{guest.plates}</div>
    </div>
  )
}
