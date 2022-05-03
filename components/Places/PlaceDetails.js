export default function PlaceDetails({ place }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">{place.name}</h1>
      <p className="text-center">{place.contact}</p>
      <p className="my-2 p-1">{place.resume}</p>
      <div className="flex justify-center">
        <button className="btn btn-primary">
          Contactar
        </button>
      </div>
      <h2 className="text-xl font-bold">Reglamento</h2>
      <p className="p-1 whitespace-pre-line">{place.rules}</p>
      <h2 className="text-xl font-bold">Recomendaciones de la casa</h2>
      <p className="p-1 whitespace-pre-line">{place.recomendations}</p>
      <div className="flex justify-center">
        <button className="btn btn-primary">
          Contactar
        </button>
      </div>
    </div>
  )
}