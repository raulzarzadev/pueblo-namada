import { INFO } from '../../CONSTANTS/PROJECT'
export default function Hero () {
  return (
    <div className="hero min-h-screen" style={{ backgroundImage: 'url(/images/overlander.jpg)' }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-4xl font-bold">{INFO.short_name}</h1>
          <p className="my-2">{INFO.short_description}</p>
          {/*  <p className="mb-5">Acampar, fácil, seguro, barato, </p> */}
          {/* <Link href='/places' >
            <a className="btn btn-primary">
              Buscar
            </a>
          </Link> */}
        </div>
      </div>
    </div>)
}
