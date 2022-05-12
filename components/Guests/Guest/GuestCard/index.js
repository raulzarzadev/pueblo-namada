//@ts-check
import Image from "next/image"
import { useRouter } from "next/router"
import { deleteGuest } from "../../../../firebase/guests"
import SendIcon from "../../../icons/SendIcon"
import MainModal from "../../../Modal/MainModal"
import GuestPayments from "../GuestPayments"

const GuestCard = ({ guest, place, isOwner }) => {
  const router = useRouter()

  const { publicImage, publicContact, imageID, plates, phone, email } = guest
  const handleDeleteGuest = (id) => {
    deleteGuest(id).then(res => {
      console.log('res', res);
    })
  }
  const handleEditGuest = (id) => {
    router.push(`/guests/${id}`)
    localStorage.setItem('guest-edit', JSON.stringify(guest))
  }

  const DOMAIN = 'https://peace-parking.vercel.app'
  const PLACE_URL = `${DOMAIN}/places/${place.id}`

  const CONTENT_INFO = `Te damos la bienvenida a ${place.name}. Puedes ver mas detalles del lugar en ${PLACE_URL}`
  const SUBJECT_INFO = `Bienvenido a ${place.name}`

  return (
    <div className="relative">
      <div className="relative h-32 w-full">
        {publicImage &&
          <Image src={publicImage} objectFit='cover' layout="fill" />
        }
      </div>
      <div className="absolute top-0 bottom-0 right-0 left-0 p-2 bg-slate-900 bg-opacity-40">
        <h3 className="font-bold text-white">
          {guest.name}
        </h3>
        <p className="text-white">{publicContact}</p>

        {isOwner && guest?.phone && (
          <MainModal
            buttonLabel=""
            title="Detalles de huesped"
            OpenComponentProps={{ className: 'absolute right-0 left-0 top-0 bottom-0' }}
          >
            <div className="max-w-sm mx-auto">
              <p>
                <span className="font-bold">Nombre:</span> {guest.name}
              </p>
              {plates &&
                <p>
                  <span className="font-bold ">Placas:</span> {plates}
                </p>
              }
              {phone &&
                <div className="flex">
                  <span className="font-bold">Teléfono:</span> {phone}
                  <a className="flex mx-2" target='_blank' href={`https://wa.me/${phone}?text=${CONTENT_INFO}`}>
                    ws <SendIcon />
                  </a>
                </div>
              }
              {email &&
                <div className="flex">
                  <span className="font-bold">Email:</span> {email}
                  <a
                    target='_blank'
                    className=" "
                    href={`mailto:${email}?subject=${SUBJECT_INFO}&body=${CONTENT_INFO}`}
                  >
                    <SendIcon />
                  </a>
                </div>
              }

              <div className="flex justify-around py-3 ">
                <MainModal title='Eliminar huesped' buttonLabel="Eliminar" OpenComponentType={'delete'}>
                  <div className="flex flex-col items-center">
                    <p>¿Estás seguro de que deseas eliminar este huesped?</p>
                    <button className="btn btn-error btn-sm my-4" onClick={() => handleDeleteGuest(guest.id)}>Eliminar</button>
                  </div>
                </MainModal>
                <button className="btn btn-info btn-sm" onClick={() => handleEditGuest(guest.id)}>
                  Editar
                </button>
              </div>

              <div className="sm:flex sm:justify-evenly">
                {publicImage &&
                  <figure className="relative mx-auto h-40 sm:w-1/2">
                    <Image src={publicImage} objectFit='cover' layout="fill" />
                  </figure>
                }

                {imageID &&
                  <figure className="relative mx-auto h-40 sm:w-1/2">
                    <Image src={imageID} objectFit='cover' layout="fill" />
                  </figure>
                }
              </div>

              <div>
                <GuestPayments place={place} guest={guest} />
              </div>
            </div>
          </MainModal>
        )}
      </div>
    </div >
  )
}

export default GuestCard