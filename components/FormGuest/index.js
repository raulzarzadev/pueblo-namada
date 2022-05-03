import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { newPlaceGuest } from "../../firebase/guests";
import Text from "../inputs/text";

export default function FormGuest() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { query: { id: placeId } } = useRouter()
  const onSubmit = data => {
    newPlaceGuest({ ...data, placeId }).then(res => {
      console.log(res);
    })
  };

  return (
    <div className="max-w-sm mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2 place-content-center">
          <Text {...register('name')} label='Nombre' />
          <Text {...register('imageID')} label='Identificación' />
          <Text {...register('Image')} label='Imagen' />
          <Text {...register('plates')} label='Placas' />
          <Text {...register('contact')} label='Contact' />
          <Text {...register('publicContact')} label='Public Contact' />
          <button className="btn btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}