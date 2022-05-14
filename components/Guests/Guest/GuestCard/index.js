//@ts-check
import Image from "next/image"
import { useRouter } from "next/router"
import { deleteGuest } from "../../../../firebase/guests"
import SendIcon from "../../../icons/SendIcon"
import MainModal from "../../../Modal/MainModal"
import { GuestDetails } from "../GuestDetails"
import GuestPayments from "../GuestPayments"

const GuestCard = ({ guest, place, isOwner }) => {


  const { publicImage, publicContact } = guest



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

        {isOwner && (
          <MainModal
            title="Detalles de huesped"
            OpenComponentProps={{ className: 'absolute right-0 left-0 top-0 bottom-0' }}
          >
            <GuestDetails guest={guest} place={place} />
          </MainModal>
        )}
      </div>
    </div >
  )
}


export default GuestCard