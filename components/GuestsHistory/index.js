import Image from 'next/image'
import { useUser } from '@comps/context/userContext'
import { useEffect, useState } from 'react'
import {
  deleteAccommodation,
  listenAccommodationPayments
} from '../../firebase/accomodations'
import { deleteGuest, listenPlaceGuests } from '../../firebase/guests'
import FormAccommodation from '../FormAccommodation'
import MainModal from '../Modal/MainModal'
import { format } from 'date-fns'
import Section from '../Section'
import { formatDate } from '../../utils/dates'
import { useRouter } from 'next/router'
import SendIcon from '../icons/SendIcon'

export default function GuestsHistory ({ place }) {
  const { user } = useUser()
  const isOwner = place?.userId === user?.uid

  const [guests, setGuests] = useState(undefined)
  useEffect(() => {
    listenPlaceGuests(place.id, setGuests)
  }, [])

  const showGuest = () => {
    let res = false
    console.log(place)
    // visible si es propietario
    if (!!isOwner && place?.config?.guestsVisiblesFor?.admin) res = true

    // visible si esta registrado
    if (!!user && place?.config?.guestsVisiblesFor?.all) res = true

    // TODO visible si es huesped

    // if (place.config.guestsVisiblesFor.guest) res = true

    return res
  }

  return (
    <div className="">
      <h1 className="text-center font-bold border">Huespedes</h1>
      <div className="grid sm:grid-cols-2  md:grid-cols-3 max-w-4xl mx-auto">
        {showGuest() &&
          guests?.map((guest) => (
            <GuestCard
              key={guest.id}
              guest={guest}
              place={place}
              isOwner={isOwner}
            />
          ))}
      </div>
    </div>
  )
}

const GuestCard = ({ guest, place, isOwner }) => {
  const router = useRouter()

  const { publicImage, publicContact, imageID, plates, phone, email } = guest
  const handleDeleteGuest = (id) => {
    deleteGuest(id).then((res) => {
      console.log('res', res)
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
        {publicImage && (
          <Image src={publicImage} objectFit="cover" layout="fill" />
        )}
      </div>
      <div className="absolute top-0 bottom-0 right-0 left-0 p-2 bg-slate-900 bg-opacity-40">
        <h3 className="font-bold text-white">{guest.name}</h3>
        <p className="text-white">{publicContact}</p>

        {isOwner && guest?.phone && (
          <MainModal
            buttonLabel=""
            title="Detalles de huesped"
            OpenComponentProps={{
              className: 'absolute right-0 left-0 top-0 bottom-0'
            }}
          >
            <div className="max-w-sm mx-auto">
              <p>
                <span className="font-bold">Nombre:</span> {guest.name}
              </p>
              {plates && (
                <p>
                  <span className="font-bold ">Placas:</span> {plates}
                </p>
              )}
              {phone && (
                <div className="flex">
                  <span className="font-bold">Teléfono:</span> {phone}
                  <a
                    className="flex mx-2"
                    target="_blank"
                    href={`https://wa.me/${phone}?text=${CONTENT_INFO}`}
                    rel="noreferrer"
                  >
                    ws <SendIcon />
                  </a>
                </div>
              )}
              {email && (
                <div className="flex">
                  <span className="font-bold">Email:</span> {email}
                  <a
                    target="_blank"
                    className=" "
                    href={`mailto:${email}?subject=${SUBJECT_INFO}&body=${CONTENT_INFO}`}
                    rel="noreferrer"
                  >
                    <SendIcon />
                  </a>
                </div>
              )}

              <div className="flex justify-around py-3 ">
                <MainModal
                  title="Eliminar huesped"
                  buttonLabel="Eliminar"
                  OpenComponentType={'delete'}
                >
                  <div className="flex flex-col items-center">
                    <p>¿Estás seguro de que deseas eliminar este huesped?</p>
                    <button
                      className="btn btn-error btn-sm my-4"
                      onClick={() => handleDeleteGuest(guest.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </MainModal>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => handleEditGuest(guest.id)}
                >
                  Editar
                </button>
              </div>

              <div className="sm:flex sm:justify-evenly">
                {publicImage && (
                  <figure className="relative mx-auto h-40 sm:w-1/2">
                    <Image src={publicImage} objectFit="cover" layout="fill" />
                  </figure>
                )}

                {imageID && (
                  <figure className="relative mx-auto h-40 sm:w-1/2">
                    <Image src={imageID} objectFit="cover" layout="fill" />
                  </figure>
                )}
              </div>

              <div>
                <GuestPayments place={place} guest={guest} />
              </div>
            </div>
          </MainModal>
        )}
      </div>
    </div>
  )
}

const GuestPayments = ({ place, guest }) => {
  const guestId = guest.id
  const placeId = place.id
  const [payments, setPayments] = useState(undefined)
  useEffect(() => {
    listenAccommodationPayments({ placeId, guestId }, setPayments)
  }, [])

  const handleDeleteAccommodation = (id) => {
    console.log('id', id)
    deleteAccommodation(id).then((res) => {
      console.log('res', res)
    })
  }

  return (
    <div>
      <h1 className="text-center font-bold mt-10">Historial de pagos</h1>
      <div className="flex justify-center">
        <MainModal
          title="Nuevo huesped"
          OpenComponentType="primary"
          buttonLabel="Nuevo pago"
        >
          <FormAccommodation place={place} guest={guest} />
        </MainModal>
      </div>
      {!payments?.length && <p className="text-center">Sin pagos aún</p>}
      {payments?.map((payment) => {
        const {
          discountedNights,
          mxnTotal,
          usdTotal,
          nights,
          createdAt,
          dates,
          prices
        } = payment
        return (
          <div className="flex justify-evenly flex-col my-2 " key={payment.id}>
            <div className="text-right">
              ${parseFloat(payment?.mxnTotal).toFixed(2)}
            </div>
            <div className="sm:flex justify-between">
              <div>
                Desde:
                {dates?.starts ? formatDate(dates?.starts, 'dd/MM/yy') : 'n/d'}
              </div>
              <div>
                Hasta:{' '}
                {dates?.ends ? formatDate(dates?.ends, 'dd/MM/yy') : 'n/d'}
              </div>
            </div>
            <Section title={'Detalles'}>
              <div>
                <div className="flex justify-between">
                  <div>
                    <div>
                      <span>Noches:</span>{' '}
                      <span className="font-bold">{nights}</span>
                    </div>
                    <div>
                      <span>Precios: </span>
                      <div>
                        Noche:{' '}
                        <span className="font-bold">${prices?.night}</span>
                      </div>
                      <div>
                        USD: <span className="font-bold">${prices?.usd}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div>
                      <span>Descuento(noches):</span>{' '}
                      <span className="font-bold">{discountedNights || 0}</span>
                    </div>
                    <div>
                      <span>Total (mxn):</span>{' '}
                      <span className="font-bold">
                        ${parseFloat(mxnTotal).toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span>Total (usd):</span>{' '}
                      <span className="font-bold">
                        ${parseFloat(usdTotal).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div>
                    Desde:
                    <span className="font-bold">
                      {dates?.starts ? formatDate(dates.starts) : 'n/d'}
                    </span>
                  </div>
                  <div>
                    Hasta:
                    <span className="font-bold">
                      {dates?.ends
                        ? formatDate(new Date(dates?.ends), 'dd/MM/yy')
                        : 'n/d'}
                    </span>
                  </div>
                  <div>
                    Creado :
                    <span className="font-bold">
                      {format(new Date(createdAt), 'dd/MM/yy HH:mm')}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center my-4">
                  <MainModal buttonLabel="Eliminar" OpenComponentType="delete">
                    <div className="flex flex-col items-center flex-center">
                      <p className="text-center">
                        ¿Seguro de que deseas eliminar este hospedaje?
                      </p>
                      <button
                        className="btn btn-error btn-sm m-4"
                        onClick={() => handleDeleteAccommodation(payment.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </MainModal>
                </div>
              </div>
            </Section>
            <div className="divider" />
          </div>
        )
      })}
    </div>
  )
}
