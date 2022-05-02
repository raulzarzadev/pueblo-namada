export default function PlacesList() {
  return (
    <div className="grid gap-2">
      <h1 className="text-3xl font-bold text-center">Lugares cercanos</h1>

      <div class="card card-side bg-base-100 shadow-xl bg-no-repeat bg-contain bg-[url(https://api.lorem.space/image/movie?w=200&h=280)] bg-right sm:bg-none" style={{ backgroundImage: '' }}>
        <figure className="hidden sm:block" ><img className="hidden sm:block" src="https://api.lorem.space/image/movie?w=200&h=280" alt="Movie" /></figure>
        <div class="card-body text-right p-1 max-w-[70%] ">
          <h2 class="text-right ">Peace Hostel</h2>
          <p className="text-right ">Lugar cerca del centro, junto a la cilcovia a 2min del la playa</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">visitar</button>
          </div>
        </div>
      </div>

    </div>
  )
}