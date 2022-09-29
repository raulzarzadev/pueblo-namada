import FORM_STATUS from '@/CONSTANTS/FORM_STATUS'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { uploadFile } from '../../firebase/uploadImage'
import File from '../inputs/file'
import Phone from '../inputs/phone'
import Text from '../inputs/text'

export default function FormUserInfoGuest({
  register,
  watch,
  setValue,
  onChangeFormStatus
}) {
  const onSubmit = (data) => {
    // setLabelSave(FORM_STATUS[2])
    // if (guest?.id) {
    //   // update guest
    //   updateGuest(guest.id, data).then((res) => {
    //     console.log('res', res)
    //     if (res) {
    //       setLabelSave(FORM_STATUS[1])
    //       localStorage.removeItem('guest-edit')
    //       back()
    //     }
    //   })
    // } else {
    //   createGuest({ ...data, placeId }).then(
    //     ({ document }) => {
    //       if (document?.id) {
    //         setLabelSave(FORM_STATUS[1])
    //         console.log('saved')
    //         back()
    //       }
    //     }
    //   )
    // }
  }

  const handleUploadFile = async ({ fieldName, file }) => {
    onChangeFormStatus(FORM_STATUS.saving)
    uploadFile(
      file,
      `guests/${fieldName}s/`,
      (progress, downloadURL) => {
        setImageProgress(progress)
        if (downloadURL) {
          setValue(fieldName, downloadURL)
          onChangeFormStatus(FORM_STATUS.save)
        } else {
          FORM_STATUS.error
        }
      }
    )
  }
  const [imageProgress, setImageProgress] = useState(0)

  return (
    <div className='max-w-sm mx-auto  bg-inherit'>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <div className='grid gap-1 place-content-center p-1  '>
        <Text
          {...register('guestProfile.name')}
          label='Nombre'
          placeholder='Nombre del conductor'
        />
        <Text
          {...register('guestProfile.plates')}
          label='Placas'
          placeholder='Placas del auto'
        />
        <Phone
          label='Teléfono (whatsapp)'
          onChange={(value) => {
            setValue('phone', value)
          }}
          value={watch('guestProfile.phone')}
        />
        <File
          showProgress
          progress={imageProgress}
          preview={watch('guestProfile.imageID')}
          onChange={({ target: { files } }) =>
            handleUploadFile({
              fieldName: 'guestProfile.imageID',
              file: files[0]
            })
          }
          label='Imagen ID'
        />
        <File
          preview={watch('guestProfile.publicImage')}
          onChange={({ target: { files } }) =>
            handleUploadFile({
              fieldName: 'guestProfile.publicImage',
              file: files[0]
            })
          }
          label='Imagen pública '
        />
      </div>
      {/* </form> */}
    </div>
  )
}
