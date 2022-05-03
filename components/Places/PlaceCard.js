import Link from "next/link";

export default function PlaceCard({ place }) {
  const name = 'peace-center'
  return (
    <div class="card card-side bg-base-100 shadow-xl bg-no-repeat bg-contain " >
      <figure  ><img className="" src="https://api.lorem.space/image/movie?w=200&h=280" alt="Movie" /></figure>
      <div class="card-body p-1 max-w-[50%] sm:max-w-[75%] ">
        <h2 class=" card-title">Peace Center</h2>
        <p className=" ">Lugar cerca del centro, junto a la cilcovia a 2min del la playa</p>
        <div class="card-actions justify-center">
          <Link href={`/places/${name}`}>
            <a className="btn btn-primary">
              Visitar
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}