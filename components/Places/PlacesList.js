import PlaceCard from "./PlaceCard";

export default function PlacesList() {
  return (
    <div className="grid gap-2">
      <h1 className="text-3xl font-bold text-center">Lugares cercanos</h1>
      <PlaceCard />

    </div>
  )
}