import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { newPlaceGuest, updateGuest } from "../../firebase/guests";
import { uploadFile } from "../../firebase/uploadImage";
import File from "../inputs/file";
import Phone from "../inputs/phone";
import Text from "../inputs/text";
import Checkbox from '../inputs/checkbox';
import Loading from "../Loadign";


export default function FormGuest({ guest }) {

  useEffect(() => {
    const gestStorage = localStorage.getItem('new-guest-form')
    if (gestStorage) {

    }
  }, [])

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({ defaultValues: { ...guest } });

  const { query: { id: placeId }, back } = useRouter()

  const FORM_STATUS = {
    0: 'Guardar',
    1: 'Guardado',
    2: 'Guardando',
    3: 'Cancelado'
  }



  const defaultLabel = FORM_STATUS[0]
  const [labelSave, setLabelSave] = useState(defaultLabel);

  const onSubmit = data => {
    setLabelSave(FORM_STATUS[2])
    if (guest?.id) {
      // update guest
      updateGuest(guest.id, data)
        .then(res => {
          console.log('res', res)
          if (res) {
            setLabelSave(FORM_STATUS[1])
            localStorage.removeItem('guest-edit')
            back()
          }
        })
    } else {
      newPlaceGuest({ ...data, placeId }).then(({ document }) => {
        if (document?.id) {
          setLabelSave(FORM_STATUS[1])
          console.log('saved');
          back()
        }
      })
    }
  }

  const handleUploadFile = async ({ fieldName, file }) => {
    setLabelSave(FORM_STATUS[2])

    uploadFile(file, `gests/${fieldName}s/`, (progress, downloadURL) => {
      if (downloadURL) {
        setValue(fieldName, downloadURL)
        setLabelSave(FORM_STATUS[0])
      }
    });
  }

  return (
    <div className="max-w-sm mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-end sticky top-8 bg-base-100 pb-1  ">
          <button className="btn btn-primary my-1" disabled={['Guardado', 'Guardando', 'Cancelado'].includes(labelSave)}>
            {labelSave == FORM_STATUS[2] && <Loading />}
            {labelSave}
          </button>
        </div>
        <div className="grid gap-2 place-content-center p-1  ">
          <div className="my-5">
            <span className="mx-2 flex justify-center ">
              ¿Huesped público?
              <span className="mx-2">
                <Checkbox size='xl' {...register('publicGuest')} />
              </span>
            </span>
            <span className="text-xs">
              Otros huespedes podran ver tu "contacto publico" y podras ver el de otros huespedes
            </span>
          </div>
          <Text
            {...register('name')}
            label='Nombre'
            placeholder='Nombre del conductor'
          />
          <Text
            {...register('plates')}
            label='Placas'
            placeholder='Placas del auto'
          />
          <Text
            {...register('publicContact')}
            label='Public Contact'
            placeholder='instagram - facebook - pagina web'
          />
          <Text
            {...register('email')}
            label='Email'
            placeholder='Email '
          />
          <Phone
            label='Teléfono (whatsapp)'
            onChange={(value) => {
              setValue('phone', value)
            }}
            value={watch('phone')}
          />
          <File
            preview={watch('imageID')}
            onChange={({ target: { files } }) => handleUploadFile({ fieldName: 'imageID', file: files[0] })}
            label='Imagen ID'
          />
          <File
            preview={watch('publicImage')}
            onChange={({ target: { files } }) => handleUploadFile({ fieldName: 'publicImage', file: files[0] })}
            label='Imagen pública '
          />



        </div>
      </form>
    </div>
  )
}