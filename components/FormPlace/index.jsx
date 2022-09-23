import { selectPlaceState } from '@/store/slices/placeSlice'
import {
  createPlace,
  updatePlace
} from '@firebase/Places/main'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { uploadFile } from '../../firebase/uploadImage'
import File from '../inputs/file'
import Phone from '../inputs/phone'
import Text from '../inputs/text'
import Textarea from '../inputs/textarea'

import { useSelector } from 'react-redux'

export default function FormPlace({
  place,
  editing = false
}) {
  const placeRedux = useSelector(selectPlaceState)

  console.log(place)
  console.log(placeRedux)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({ defaultValues: { ...place } })

  const FORM_STATUS = {
    0: 'Guardar',
    1: 'Guardado',
    2: 'Guardando',
    3: 'Cancelado'
  }

  const defaultLabel = FORM_STATUS[0]
  const [labelSave, setLabelSave] = useState(defaultLabel)

  const onSubmit = (data) => {
    setLabelSave(FORM_STATUS[2])
    editing
      ? updatePlace(place.id, data).then((res) => {
          console.log(res)
          setLabelSave(FORM_STATUS[1])
          setTimeout(() => {
            setLabelSave(defaultLabel)
            // router.back()
          }, 1000)
        })
      : createPlace(data).then((res) => {
          console.log('created place', res)
          setLabelSave(FORM_STATUS[1])
          setTimeout(() => {
            setLabelSave(defaultLabel)
            // router.back()
          }, 1000)
        })
  }

  const handleUploadFile = async ({ fieldName, file }) => {
    setLabelSave(FORM_STATUS[2])
    uploadFile(
      file,
      `places/${fieldName}s/`,
      (progress, downloadURL) => {
        if (downloadURL) {
          setValue(fieldName, downloadURL)
          setLabelSave(FORM_STATUS[0])
        }
      }
    )
  }

  return (
    <div className='p-1 max-w-sm mx-auto'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='sticky top-0 left-0 right-0 flex w-full justify-end bg-base-300 z-10 p-1'>
          <button
            className='btn btn-primary'
            disabled={[
              'Guardado',
              'Editado',
              'Guardando'
            ].includes(labelSave)}
          >
            {labelSave}
          </button>
        </div>
        <div className='grid gap-1 place-content-stretch '>
          <Text {...register('name')} label={'Nombre'} />
          <Text
            {...register('address')}
            label={'Dirección'}
          />
          <Text {...register('email')} label={'Email'} />
          {/*  <Text {...register('phone')} label={'Telefono'} /> */}
          <Phone
            onChange={(value) => {
              setValue('phone', value)
            }}
            value={watch('phone')}
            label={'Telefono'}
          />
          <Text
            type='number'
            {...register('price')}
            label={'Costo por día'}
          />
          <Text
            type='number'
            {...register('usdPrice')}
            label={'precio por USD'}
          />
          <File
            onChange={({ target: { files } }) =>
              handleUploadFile({
                fieldName: 'image',
                file: files[0]
              })
            }
            label={'Imagen'}
            preview={watch('image')}
          />
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
            {...register('amenities')}
            label='Amenidades '
            rows={4}
            placeholder='WiFi, TV, Bicicletas gratis y mucho mas'
          />
          <Textarea
            {...register('rules')}
            label='Reglamento'
            placeholder=' Un reglamento les ayudara a tus huespedes  a familiarizarse con el lugar'
            rows={8}
          />
          <Textarea
            {...register('recomendations')}
            label='Recomendaciones'
            rows={4}
          />
        </div>
      </form>
    </div>
  )
}
