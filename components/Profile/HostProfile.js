import Link from "next/link";
import { useEffect, useState } from "react";
import { listenUserPlaces } from "../../firebase/places";
import PlaceCard from "../Places/PlaceCard";

const HostProfile = () => {
  const [places, setPlaces] = useState(undefined)

  useEffect(() => {
    listenUserPlaces(setPlaces)
  }, [])
  return (
    <div>
      <h2 className="text-center">Mis Lugares</h2>
      <div className="flex w-full justify-center p-2">
        <Link href="/new-place">
          <a className="btn btn-info btn-sm">Nuevo lugar</a>
        </Link>
      </div>
      <div className="grid gap-4 max-w-lg mx-auto">
        {places?.map((place) => (
          <PlaceCard key={place?.id} place={place} linkToDashboard isOwner />
        ))}
      </div>
    </div>
  );
}

export default HostProfile;