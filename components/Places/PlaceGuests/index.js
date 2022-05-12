//@ts-check
import { useEffect, useState } from "react"
import { listenPlaceGuests } from "../../../firebase/guests";
import { useUser } from "../../context/userContext";
import GuestCard from "../../Guests/Guest/GuestCard";
import PlacePyments from "../PlacePyments";

export default function PlaceGuests({ place, showTable = false, showCards = false }) {

  const { user } = useUser()
  const isOwner = place?.userId === user?.uid

  const showGuest = () => {
    let res = false
    // console.log(place)
    // visible si es propietario
    if (!!isOwner && place?.config?.guestsVisiblesFor?.admin) res = true

    // visible si esta registrado
    if (!!user && place?.config?.guestsVisiblesFor?.all) res = true

    // TODO visible si es huesped

    // if (place.config.guestsVisiblesFor.guest) res = true

    return res
  }

  if (!showGuest()) return <div>Cannot see the guests</div>



  const [guests, setGuests] = useState(undefined)
  useEffect(() => {
    listenPlaceGuests(place.id, setGuests)
  }, [])


  return (
    <div className="">
      <h1 className="text-center font-bold border">Huespedes</h1>
      <div className="grid sm:grid-cols-2  md:grid-cols-3 max-w-4xl mx-auto">

        <div>
          {showCards &&
            guests?.map((guest, i) => <GuestCard key={`${guest.id}-${i}`} guest={guest} isOwner={isOwner} place={place} />)
          }
          {showTable &&
            <div className="">
              {guests.map((guest, i) => <div key={`${guest.id}-${i}`}>{guest.name}</div>)}
            </div>
          }


        </div>

      </div>
    </div>
  )
}