import Image from "next/image"
import { useEffect, useState } from "react"
import { listenAccommodationPayments } from "../../firebase/accomodations"
import { listenPlaceGuests } from "../../firebase/guests"
import FormAccommodation from "../FormAccommodation"
import MainModal from "../Modal/MainModal"
import { format } from "date-fns"
export default function GuestsHistory({ place, owner }) {
  const [guests, setGuests] = useState(undefined)
  useEffect(() => {
    listenPlaceGuests(place.id, setGuests)
  }, [])
  return (
    <div className="">
      <h1 className="text-center font-bold border">Guests History</h1>

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

        {owner && guest?.phone && (<div className="flex justify-end absolute bottom-0 left-0 right-0 p-2">
          <MainModal buttonLabel="Detalles" title="Detalles de huesped" >
            <div className="max-w-sm mx-auto">

              <p>
                <span className="font-bold">Nombre:</span> {guest.name}
              </p>
              {plates &&
                <p>
                  <span className="font-bold">Placas:</span> {plates}
                </p>
              }
              {phone &&
                <div className="">
                  <span className="font-bold">Teléfono:</span> {phone}
                  <a target='_blank' className="btn-xs btn-circle btn mx-2 btn-warning" href={`https://wa.me/${phone}`}>ws</a>
                </div>
              }
              <div>
                <FormAccommodation place={place} guest={guest} />
              </div>
              <div>

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
                <GuestPayments guestId={guest.id} placeId={place.id} />
              </div>
            </div>
          </MainModal>
        </div>)}
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
        return (
          <div className="flex justify-evenly flex-col my-2 " key={payment.id}>
            <div className="text-right">
              ${parseFloat(payment?.mxnTotal).toFixed(2)}
            </div>
            <div className="sm:flex justify-between">
              <div>
                Desde:
                {payment?.dates?.starts ? format(new Date(payment?.dates?.starts), "dd/MM/yyyy") : 'n/d'}
              </div>
              <div>
                Hasta: {payment?.dates?.ends ? format(new Date(payment?.dates?.ends), "dd/MM/yyyy") : 'n/d'}
              </div>
            </div>
            <div className="divider" />
          </div>
        )
      })}
    </div>
  )
}