import Image from "next/image"
import { useEffect, useState } from "react"
import { listenAccommodationPayments } from "../../firebase/accomodations"
import { deleteGuest, listenPlaceGuests } from "../../firebase/guests"
import FormAccommodation from "../FormAccommodation"
import MainModal from "../Modal/MainModal"
import { format } from "date-fns"
import Section from "../Section"
import { formatDate } from "../../utils/dates"
export default function GuestsHistory({ place, owner }) {
  const [guests, setGuests] = useState(undefined)
  useEffect(() => {
    listenPlaceGuests(place.id, setGuests)
  }, [])
  return (
    <div className="">
      <h1 className="text-center font-bold border">Huespedes</h1>

      <div className="grid sm:grid-cols-2  md:grid-cols-3 max-w-4xl mx-auto">
        {guests?.map(guest => (
          <GuestCard key={guest.id} guest={guest} owner={owner} place={place} />
        ))}
      </div>

    </div>
  )
}




const GuestCard = ({ guest, owner, place }) => {
  const { publicImage, publicContact, imageID, plates, phone } = guest
  const handleDeleteGuest = (id) => {
    deleteGuest(id).then(res => {
      console.log('res', res);
    })
  }
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

        {owner && guest?.phone && (
          <MainModal buttonLabel="" title="Detalles de huesped" OpenComponentProps={{ className: 'absolute right-0 left-0 top-0 bottom-0' }} >
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
                <div className="">
                  <span className="font-bold">Teléfono:</span> {phone}
                  <a target='_blank' className="btn-xs btn-circle btn mx-2 btn-warning" href={`https://wa.me/${phone}`}>ws</a>
                </div>
              }

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
              <Section title={'Nuevo hospedaje'}>
                <FormAccommodation place={place} guest={guest} />
              </Section>
              <Section title='Opciones'>
                <div className="flex justify-around p-1">
                  <MainModal title='Eliminar huesped' buttonLabel="Eliminar" OpenComponentProps={{ className: 'btn btn-error btn-sm' }}>
                    <div className="flex flex-col items-center">
                      <p>¿Estás seguro de que deseas eliminar este huesped?</p>
                      <button className="btn btn-error btn-sm my-4" onClick={() => handleDeleteGuest(guest.id)}>Eliminar</button>
                    </div>
                  </MainModal>
                </div>
              </Section>
              <div>
                <GuestPayments guestId={guest.id} placeId={place.id} />
              </div>
            </div>
          </MainModal>
        )}
      </div>
    </div >
  )
}

const GuestPayments = ({ guestId, placeId }) => {
  const [payments, setPayments] = useState(undefined)
  useEffect(() => {
    listenAccommodationPayments({ placeId, guestId }, setPayments)
  }, [])


  return (
    <div>
      <h1 className="text-center font-bold mt-10">Historial de pagos</h1>
      {payments?.map(payment => {
        const { discountedNights, mxnTotal, usdTotal, nights, createdAt, dates, prices } = payment
        console.log(payment);
        return (
          <div className="flex justify-evenly flex-col my-2 " key={payment.id}>
            <div className="text-right">
              ${parseFloat(payment?.mxnTotal).toFixed(2)}
            </div>
            <div className="sm:flex justify-between">
              <div>
                Desde:
                {dates?.starts ? formatDate(dates?.starts, "dd/MM/yy") : 'n/d'}
              </div>
              <div>
                Hasta: {dates?.ends ? formatDate(dates?.ends, "dd/MM/yy") : 'n/d'}
              </div>
            </div>
            <Section title={'Detalles'}>
              <div>
                <div className="flex justify-between">
                  <div >
                    <div>
                      <span >Noches:</span> <span className="font-bold">{nights}</span>
                    </div>
                    <div>
                      <span>Precios: </span>
                      <div>
                        Noche: <span className="font-bold">${prices?.night}</span>
                      </div>
                      <div>
                        USD: <span className="font-bold">${prices?.usd}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div>
                      <span >Descuento(noches):</span> <span className="font-bold">{discountedNights || 0}</span>
                    </div>
                    <div>
                      <span >Total (mxn):</span> <span className="font-bold">${parseFloat(mxnTotal).toFixed(2)}</span>
                    </div>
                    <div>
                      <span >Total (usd):</span> <span className="font-bold">${parseFloat(usdTotal).toFixed(2)}</span>
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
                      {dates?.ends ? formatDate(new Date(dates?.ends), "dd/MM/yy") : 'n/d'}
                    </span>
                  </div>
                  <div>
                    Creado :
                    <span className="font-bold">
                      {format(new Date(createdAt), "dd/MM/yy HH:mm")}
                    </span>
                  </div>
                </div>
                <MainModal buttonLabel="Eliminar" OpenComponentType='delete'>
                  <div className="flex flex-col items-center flex-center">
                    <p>¿Seguro de que deseas eliminar este hospedaje?</p>
                    <button className="btn btn-error btn-sm m-4">Eliminar</button>
                  </div>
                </MainModal>
              </div>
            </Section>
            <div className="divider" />
          </div>
        )
      })}
    </div>
  )
}