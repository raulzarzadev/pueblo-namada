import Image from "next/image";
import Link from "next/link";

function PlaceCard({ place, linkToDashboard, isOwner }) {
  const { name, resume = '', address, id, image } = place
  return (
    <div className="card card-side bg-base-100 shadow-xl bg-no-repeat bg-contain w-full" >

      <div className="card-body p-1   ">
        <div className=" flex flex-col sm:">
          <h2 className="text-lg font-bold " >{name}</h2> <p className="font-normal text-sm ">{address}</p>
        </div>
        <p className=" whitespace-pre-line ">{resume?.substring(0, 180)} <span className="italic underline"> <Link href={`/places/${id}`}>ver mas</Link></span></p>
        <div className="card-actions justify-evenly">
          <Link href={`/places/${id}`}>
            <a className="btn btn-outline btn-sm ">
              Visitar
            </a>
          </Link>
          {linkToDashboard && isOwner &&
            <Link href={`/places/${id}/dashboard`}>
              <a className="btn btn-outline btn-sm ">
                Dashboard
              </a>
            </Link>
          }
        </div>
      </div>
      {image &&
        <figure className="relative w-full" >
          <Image src={image} layout="fill" objectFit="cover" />
        </figure>
      }
    </div>
  )
}


export default PlaceCard;