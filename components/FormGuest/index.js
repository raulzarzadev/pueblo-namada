export default function FormGuest() {
  return (
    <div className="">
      <form>
        <div className="grid gap-2">
          <input type='text' placeholder="Nombre" />
          <input type='text' placeholder="Dirección" />
          <input type='text' placeholder="Email" />
        </div>
      </form>
    </div>
  )
}