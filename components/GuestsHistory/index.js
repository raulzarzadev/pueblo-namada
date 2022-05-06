import Image from "next/image"
import { useEffect, useState } from "react"
import { listenPlaceGuests } from "../../firebase/guests"
import MainModal from "../Modal/MainModal"

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
          <GuestCard key={guest.id} guest={guest} owner={owner} />
        ))}
      </div>

    </div>
  )
}

const GuestCard = ({ guest, owner }) => {
  console.log(guest);
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
            </div>
          </MainModal>
        </div>)}
      </div>
    </div >
  )
}