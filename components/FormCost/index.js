import { useForm } from "react-hook-form"
import InputNumber from "../inputs/InputNumber"
import Text from "../inputs/text"
import Textarea from "../inputs/textarea"
import { createCost } from '../../firebase/Costs/main'
import { FirebaseCRUD } from "../../firebase/FirebaseCRUD"
const FormCost = ({ place }) => {
  const { handleSubmit, register, watch, formState: { errors } } = useForm({
    defaultValues: {
      date: FirebaseCRUD.format(new Date(), 'yyyy-MM-dd'),
    }
  })
  const onSubmit = (data) => {
    console.log(data)
    createCost({
      placeId: place.id,
      ...data
    }).then(res => console.log(res))
      .catch(err => console.error(err))
  }
  console.log(watch())
  return (
    <form onSubmit={handleSubmit(onSubmit)} className=''>
      <div className="sticky top-0 left-0 right-0 flex w-full justify-end  z-10 p-1">
        <button className="btn btn-primary" >
          Guardar
        </button>
      </div>
      <Text type='date' label='Fecha'  {...register('date')} />
      <Text
        {...register('title', { required: true })}
        placeholder='Titulo'
        helperText={errors.title && 'Campo requerido'}
      />

      <InputNumber
        {...register('value', { required: true })}
        placeholder='Costo'
        helperText={errors.value && 'Campo requerido'}
      />
      <Textarea
        {...register('description')}
        placeholder='Description (opcional)'
      />
    </form>
  )
}

export default FormCost