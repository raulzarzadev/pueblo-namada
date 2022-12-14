import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
  deleteObject
} from 'firebase/storage'
import { storage } from '.'
import { v4 as uidGenerator } from 'uuid'

export const storageRef = (path = '') => ref(storage, path)

export const uploadImageAsync = async (
  file,
  fieldName = '',
) => {
  const uuid = uidGenerator()
  const imageRef = storageRef(`${fieldName}/${uuid}`)
  // console.log('uplading')
  const uploadTask = await uploadBytes(imageRef, file).then(async res => {
    // console.log('upladed')
    const url = await getDownloadURL(res.ref)
    const { bucket, contentType, fullPath, size, type } = res.metadata
    return {
      url,
      metadata: {
        bucket, contentType, fullPath, size, type
      }
    }
  })
  return uploadTask
}

export const deleteImage = async ({ url }) => {
  const desertRef = ref(storage, url);
  return deleteObject(desertRef).then(() => {
    // File deleted successfully
    return { ok: true, url }
  }).catch((error) => {
    console.error(error)
    // Uh-oh, an error occurred!
  });
}
