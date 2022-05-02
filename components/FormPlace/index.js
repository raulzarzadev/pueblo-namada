export default function FormPlace() {
  return (
    <div className="p-1">
      <form>
        <div className="grid gap-2 content-center">

          <label className="label">
            <span className="label-text">
            </span>
            <input className="input input-ghost w-full max-w-xs" type='text' placeholder="Nombre" />
          </label>
          <label className="label">
            <span className="label-text">
            </span>
            <input className="input input-ghost w-full max-w-xs" type='text' placeholder="Dirección" />
          </label>
          <label className="label">
            <span className="label-text">
            </span>
            <input className="input input-ghost w-full max-w-xs" type='text' placeholder="Email" />
          </label>
          <label className="label">
            <span className="label-text">
            </span>
            <input className="input input-ghost w-full max-w-xs" type='text' placeholder="Costo por noche" />
          </label>
          <label className="label">
            <span className="label-text">
            </span>
            <textarea rows={10} type='text' placeholder="Reglamento" />
          </label>
        </div>
      </form>
    </div>
  )
}