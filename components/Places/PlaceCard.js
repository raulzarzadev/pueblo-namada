import Image from "next/image";
import Link from "next/link";

function PlaceCard({ place }) {
  const { name, resume, address, id, image } = place
  return (
    <div className="card card-side bg-base-100 shadow-xl bg-no-repeat bg-contain w-full" >

      <div className="card-body p-1   ">
        <h2 className=" card-title">{name} <span className="font-normal text-sm ">{address}</span></h2>
        <p className=" ">{resume}</p>
        <div className="card-actions justify-center">
          <Link href={`/places/${id}`}>
            <a className="btn btn-outline btn-sm ">
              Visitar
            </a>
          </Link>
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