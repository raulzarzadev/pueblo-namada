import { useForm } from "react-hook-form";
import { newPlace } from "../../firebase/places";
import Text from "../inputs/text";
import Textarea from "../inputs/textarea";

export default function FormPlace() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = data => {
    newPlace(data).then(res => {
      console.log(res);

    })
  };
  return (
    <div className="p-1">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-1 place-content-center">
          <Text {...register('name')} label={'Nombre'} />
          <Text {...register('address')} label={'Dirección'} />
          <Text {...register('email')} label={'Email'} />
          <Text {...register('phone')} label={'Telefono'} />
          <Text {...register('price')} label={'Costo por día'} />
          <Textarea
            {...register('resume')}
            label='Resumen (recomendado)'
            rows={4}
            placeholder='Esta información es la primera que veran los primeros huespedes'
          />
          <Textarea
            {...register('description')}
            label='Descripción (opcional)'
            placeholder='Describe tu lugar un poco mas extenso. '
            rows={4}
          />
          <Textarea
            {...register('rules')}
            label='Reglamento'
            placeholder=' Un reglamento les ayudara a tus huespedes  a familiarizarse con el lugar'
            rows={10}
          />
          <Textarea
            {...register('recomendations')}
            label='Recomendaciones'
            rows={10}
          />
          <button className="btn btn-primary">
            Guardar
          </button>
        </div>
      </form >
    </div >
  )
}