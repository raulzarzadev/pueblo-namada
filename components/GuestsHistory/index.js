import Image from "next/image"
import { useEffect, useState } from "react"
import { listenPlaceGuests } from "../../firebase/guests"

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
  return (
    <div className="relative">
      <div className="relative h-32 w-full">
        <Image src='/images/overlander.jpg' objectFit='cover' layout="fill" />
      </div>
      <div className="absolute top-0 bottom-0 right-0 left-0 p-2 bg-slate-900 bg-opacity-40">
        <h3 className="font-bold text-white">
          {guest.name}
        </h3>
        <p className="text-white">{guest.publicContact}</p>
        {owner && (<div className="flex justify-end absolute bottom-0 left-0 right-0 p-2">
          <a className="btn btn-info" href={`tel:${guest.contact}`} >Contactar</a>
        </div>)}
      </div>
    </div >
  )
}