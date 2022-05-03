import PlaceCard from "./PlaceCard";

export default function PlacesList({ places = [] }) {
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center">Lugares</h1>
      <div className="grid place-content-center gap-4" >
        {places.map(place =>
          <PlaceCard key={place?.id} place={place} />
        )}

      </div>
    </div>
  )
}