import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { newPlaceGuest } from "../../firebase/guests";
import { uploadFile } from "../../firebase/uploadImage";
import File from "../inputs/file";
import Phone from "../inputs/phone";
import Text from "../inputs/text";

import { v4 as uidGenerator } from 'uuid';


export default function FormGuest() {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();

  const { query: { id: placeId } } = useRouter()
  const onSubmit = data => {
    newPlaceGuest({ ...data, placeId }).then(({ document }) => {
      if (document?.id) {
        console.log('saved');
      }
    })
  }


  const handleUploadFile = async ({ fieldName, file }) => {
    const uuid = uidGenerator()
    uploadFile(file, `gests/${fieldName}s/${uuid}`, (progress, downloadURL) => {

      if (downloadURL) {
        setValue(fieldName, downloadURL)
      }
    });
  }

  console.log(watch())

  return (
    <div className="max-w-sm mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2 place-content-center p-1  ">
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
          <button className="btn btn-primary my-5">
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}