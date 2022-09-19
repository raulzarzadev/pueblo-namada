import { useForm } from 'react-hook-form'
import InputNumber from '../inputs/InputNumber'
import Text from '../inputs/text'
import Textarea from '../inputs/textarea'
import { createCost } from '../../firebase/Costs/main'
import { FirebaseCRUD } from '../../firebase/FirebaseCRUD'
import InputFile from '../inputs/InputFile'
import { format, formatISO } from 'date-fns'
const FormCost = ({ place }) => {
  const { handleSubmit, register, watch, setValue, formState: { errors }, reset } = useForm({
    defaultValues: {
      date: format(new Date(), "yyyy-MM-dd'T'HH:mm")
    }
  })
  const onSubmit = (data) => {
    createCost({
      placeId: place.id,
      ...data
    }).then(res => {
      reset({
        title: '',
        description: '',
        value: 0
      })
      console.log(res)
    })
      .catch(err => console.error(err))
  }

  const handleUpladImage = ({ fieldName, file }) => FirebaseCRUD.uploadFile(file, fieldName,
    (proggress, downladURL) => {
      if (downladURL) setValue(fieldName, downladURL)
      // console.log(proggress, downladURL)
    })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=''>
      <div className="sticky top-0 left-0 right-0 flex w-full justify-end  z-10 p-1">
        <button className="btn btn-primary" >
          Guardar
        </button>
      </div>
      <input type='datetime-local' {...register('date')} />
      {/* <Text type='datetime-local' label='Fecha'  {...register('date')} /> */}
      <Text
        {...register('title', { required: true })}
        placeholder='Titulo'
        helperText={errors.title && 'Campo requerido'}
      />

      <InputNumber
        {...register('value', { required: true })}
        placeholder='Costo'
        helperText={errors.value && 'Campo requerido'}
        step={0.01}
      />
      <InputFile onUpload={handleUpladImage} />
      <Textarea
        {...register('description')}
        placeholder='Description (opcional)'
      />
    </form>
  )
}

export default FormCost
