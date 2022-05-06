import { useRouter } from "next/router"

export default function MobilNav() {
  const router = useRouter()
  const handleRedirect = (route) => {
    router.push(route)
  }
  const handleBack = () => {
    router.back()
  }
  return (
    <div className=" h-20  ">
      <div className="fixed  bg-base-100 bottom-0 right-0 left-0  flex justify-around p-1 shadow-md">
        <button onClick={() => handleBack()} className="btn btn-circle btn-sm">
          {`<`}
        </button>
        <button onClick={() => handleRedirect('/')} className="btn btn-circle btn-sm">
          {`H`}
        </button>
      </div>
    </div>
  )
}