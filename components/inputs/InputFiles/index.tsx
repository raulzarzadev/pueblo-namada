import { deleteImage, uploadImageAsync } from "@firebase/upladImageAsync";
import ModalDelete from "comps/Modal/ModalDelete";
import PreviewImage from "comps/PreviewImage";
import Image from "next/image";
import React, { useState } from "react";
interface InputFiles {
  label: string
  imagesUploaded: (image: Image) => {}
  defaultImages?: Image[]
}
interface Image {
  url: string,
  metadata: any
}
const FilesInput = React.forwardRef(({
  label = 'Files input',
  imagesUploaded,
  onDeleteImage,
  defaultImages,
  onLoading = () => { },
  disabled
}: InputFiles,
  ref
) => {
  const [images, setImages] = useState(defaultImages)
  const [upladingImages, setUploadingImages] = useState([])

  const handleChange = async ({ target: { files = [] } }: any) => {
    onLoading(true)
    setUploadingImages([...files].map(() => {
      return { uploading: true }
    }))
    const ulpadingFiles = [...files].map((async file => {
      const imageUploaded = await uploadImageAsync(file, 'placeImages')
      return imageUploaded
    }))

    const newImages = await Promise.all(ulpadingFiles)
    setUploadingImages([])
    imagesUploaded(newImages)
    setImages([...images, ...newImages])
    onLoading(false)
  }

  const handleOpenDelete = async (url) => {
    //console.log('delete url', url)
    onLoading(true)
    const res = await deleteImage({ url })
    onDeleteImage(url)
    onLoading(false)
    //console.log(res)
  }
  //console.log(images)
  //console.log(images)
  return (
    <div>
      <label >
        <div className={`h-12 w-full hover:border-dotted  hover:border-white flex justify-center items-center rounded-lg relative cursor-pointer border-dashed border-2  ${disabled && 'opacity-30 cursor-wait '}`}>
          <div className="absolute ">
            {label}
          </div>
          <input disabled={disabled} ref={ref} accept=".jpg,.png,.jpeg" onChange={handleChange} className="hidden" type={'file'} multiple />
        </div>
      </label>
      <div className="w-full max-w-md mx-auto overflow-auto">
        <div className="grid grid-cols-4 gap-1 p-1">
          {[...images, ...upladingImages]?.map(({ url, uploading }, i) =>
            <div key={`${url}-${i}`} className=''>
              <PreviewImage
                image={url}
                uploading={uploading}
                previewSize='full'
                handleDelete={() => { handleOpenDelete(url) }}
              />
            </div>
          )}
        </div>
      </div>


    </div>
  )
})

export default FilesInput;