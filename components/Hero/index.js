import Link from "next/link";

export default function Hero() {
  return (
    <div className="hero min-h-screen" style={{ backgroundImage: 'url(/images/overlander.jpg)' }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Bienvendio a peace - parking</h1>
          <p className="mb-5">Un lugar tranquilo para acampar. Fácil, seguro, barato</p>
          <Link href='/places' >
            <a className="btn btn-primary">
              Buscar
            </a>
          </Link>
        </div>
      </div>
    </div>)
}