import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { newPlaceGuest } from "../../firebase/guests";
import DragAndDrop from "../inputs/dragAndDrop";
import File from "../inputs/file";
import Phone from "../inputs/phone";
import Text from "../inputs/text";

export default function FormGuest() {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();

  const { query: { id: placeId } } = useRouter()
  const onSubmit = data => {
    newPlaceGuest({ ...data, placeId }).then(res => {
      console.log(res);
    })
  }

  console.log(watch())

  return (
    <div className="max-w-sm mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2 place-content-center p-1  ">
          <Text {...register('name')} label='Nombre' placeholder='Nombre del conductor' />
          <Text {...register('plates')} label='Placas' placeholder='Placas del auto' />
          <Text {...register('publicContact')} label='Public Contact' placeholder='instagram - facebook - pagina web' />
          <Phone
            label='Teléfono (whatsapp)'
            onChange={(value) => {
              setValue('phone', value)
            }}
            value={watch('phone')}
          />
          {/* <File {...register('imageID')} label='Imagen ID' />
          <File {...register('imageID')} label='Imagen ' /> */}
          <button className="btn btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}