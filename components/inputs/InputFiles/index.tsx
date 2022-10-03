import { uploadImageAsync } from "@firebase/upladImageAsync";
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
const FilesInput = React.forwardRef(({ label = 'Files input', imagesUploaded, defaultImages }: InputFiles, ref) => {
  const [images, setImages] = useState(defaultImages)

  const handleChange = async ({ target: { files } }: any) => {
    const ulpadingFiles = [...files].map((async file => {
      const imageUploaded = await uploadImageAsync(file, 'placeImages')
      return imageUploaded
    }))

    const newImages = await Promise.all(ulpadingFiles)
    imagesUploaded(newImages)
    setImages([...images, ...newImages])
  }
  //console.log(images)
  //console.log(images)
  return (
    <div>
      <div className="w-full max-w-sm overflow-auto">
        <div className="grid grid-flow-col overflow-x-visible gap-4 p-2">
          {images?.map(({ url }) =>
            <div key={url} className='w-36'>
              <PreviewImage image={url} previewSize='full' />
            </div>
          )}
        </div>
      </div>
      <label>
        <div className="h-32 w-full border border-dashed border-transparent hover:border-white flex justify-center items-center rounded-lg relative cursor-pointer">
          <div className="absolute ">
            {label}
          </div>
          <input ref={ref} accept=".jpg,.png,.jpeg" onChange={handleChange} className="hidden" type={'file'} multiple />

        </div>
      </label>
    </div>
  )
})

export default FilesInput;