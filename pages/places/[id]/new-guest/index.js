import FormGuest from "../../../../components/FormGuest";
import PrivatePage from "../../../../components/HOC/PrivatePage";

export default function NewGuest() {
  return (
    <PrivatePage  >
      <div className="text-center">
        <h1 className="text-xl font-bold mt-4" >Nuevo huesped</h1>
        <FormGuest />
      </div>
    </PrivatePage>
  )
}