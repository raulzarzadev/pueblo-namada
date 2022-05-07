import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { newPlace, updatePlace } from "../../firebase/places";
import { uploadFile } from "../../firebase/uploadImage";
import File from "../inputs/file";
import Text from "../inputs/text";
import Textarea from "../inputs/textarea";

export default function FormPlace({ place, editing = false }) {
  const router = useRouter()
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm(
    { defaultValues: { ...place } }
  );

  const defaultLabel = editing ? "Editar " : "Guardar"

  const [labelSave, setLabelSave] = useState(defaultLabel);

  const onSubmit = data => {
    editing ? updatePlace(place.id, data).then(res => {
      console.log('place updated', res)
      setLabelSave('Editado')
      setTimeout(() => {
        setLabelSave(defaultLabel)
        router.back()
      }, 1000)
    }) : newPlace(data).then(res => {
      console.log('place created', res)
      setLabelSave('Guardado')
      setTimeout(() => {
        setLabelSave(defaultLabel)
        router.back()
      }, 1000)
    });

  };


  const handleUploadFile = async ({ fieldName, file }) => {
    uploadFile(file, `places/${fieldName}s/`, (progress, downloadURL) => {
      if (downloadURL) {
        setValue(fieldName, downloadURL)
      }
    });
  }

  return (
    <div className="p-1">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-1 place-content-stretch ">
          <Text {...register('name')} label={'Nombre'} />
          <Text {...register('address')} label={'Dirección'} />
          <Text {...register('email')} label={'Email'} />
          <Text {...register('phone')} label={'Telefono'} />
          <Text {...register('price')} label={'Costo por día'} />
          <Text {...register('usdPrice')} label={'precio por USD'} />
          <File onChange={({ target: { files } }) => handleUploadFile({ fieldName: 'image', file: files[0] })} label={'Imagen'} preview={watch('image')} />
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
          <button className="btn btn-primary" disabled={['Guardado', 'Editado'].includes(labelSave)}>
            {labelSave}
          </button>
        </div>
      </form >
    </div >
  )
}