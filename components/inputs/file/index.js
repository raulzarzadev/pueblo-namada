import PreviewImage from 'comps/PreviewImage'
import Image from 'next/image'
import React from 'react'

const File = React.forwardRef(
  ({ label, preview = null, showProgress, progress, ...rest }, ref) => {
    return (
      <div className='form-control w-full max-w-sm'>
        { showProgress && <progress className="progress w-full" value={ progress } max="100"></progress>
        }
        { preview && (
          <PreviewImage image={ preview } previewSize='xl' />
        ) }

        <label
          htmlFor='formFileMultiple'
          className='form-label inline-block  text-left'
        >
          { label }
        </label>
        <input
          accept="image/png, image/gif, image/jpeg"
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
          { ...rest }
        />
      </div>
    )
  }
)

export default File
