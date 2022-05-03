import { useEffect, useState } from "react";
import PlacesList from "../../components/Places/PlacesList";
import { listenPlaces } from "../../firebase/places";

export default function Places(second) {

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    listenPlaces(setPlaces)
  }, [])

  return (
    <div>
      <PlacesList places={places} />
    </div>
  )
}