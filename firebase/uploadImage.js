import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '.'

export const storageRef = (path = '') => ref(storage, path)

export const uploadFile = (file, storagePath = '', cb = (progress = 0, downloadURL = null) => { }) => {
  const imageRef = storageRef(storagePath)
  console.log(file)
  console.log(imageRef)
  const uploadTask = uploadBytesResumable(imageRef, file)

  uploadTask.on('state_changed',
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      cb(progress, null)
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        cb(100, downloadURL)
      });

    }
  );
  /*   uploadBytes(storageRef(storagePath), file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    } */
}