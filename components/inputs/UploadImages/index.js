import Image from 'next/image'
import React from 'react'

const UploadImages = React.forwardRef(
  (
    {
      label,
      preview = null,
      onUpload = ({ fieldName, files }) => { },
      name = 'image',
      ...rest
    },
    ref
  ) => {
    return (
      <div className='form-control w-full max-w-sm'>
        <label className='label'>
          { label && (
            <span className='label-text'>{ label }</span>
          ) }
        </label>
        { preview && (
          <figure className='relative h-36'>
            <Image
              src={ preview }
              objectFit='contain'
              layout='fill'
              blurDataURL='/images/overlander.jpg'
              placeholder='blur'
            />
          </figure>
        ) }
        <input
          ref={ ref }
          className='
          input
          input-bordered w-full
          file:btn
          file:rounded-r-none
          p-0
          '
          type='file'
          id='formFileMultiple'
          onChange={ ({ target: { files } }) =>
            onUpload({ fieldName: name, files })
          }
          { ...rest }
        />
      </div>
    )
  }
)

export default UploadImages
