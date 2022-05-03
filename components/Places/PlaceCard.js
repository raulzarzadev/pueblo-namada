import Image from "next/image";
import Link from "next/link";

function PlaceCard({ place }) {
  const { name, resume, address, id } = place
  return (
    <div className="card card-side bg-base-100 shadow-xl bg-no-repeat bg-contain w-full" >
      <figure className="relative w-[30%]" >
        <Image src='https://api.lorem.space/image/movie?w=200&h=280' layout="fill" objectFit="cover" />
      </figure>
      <div className="card-body p-1 max-w-[75%]  ">
        <h2 className=" card-title">{name} <span className="font-normal text-sm ">{address}</span></h2>
        <p className=" ">{resume}</p>
        <div className="card-actions justify-center">
          <Link href={`/places/${id}`}>
            <a className="btn btn-primary">
              Visitar
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}


export default PlaceCard;