import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { format as fnsFormat } from 'date-fns'
import { v4 as uidGenerator } from 'uuid'

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where
} from 'firebase/firestore'
import { db, storage } from '.'
import { Dates } from 'firebase-dates-util'
import { es } from 'date-fns/locale'

type Target = 'firebase' | 'milliseconds' | 'date' | 'fieldDate'
export class FirebaseCRUD {
  constructor(private collectionName: string = '') { }

  static format = (
    date: string | number | Date,
    stringFormat = 'dd/MM/yy'
  ): string => {
    if (!date) {
      console.error('not a date')
      return 'NaD'
    }
    const objectDate = new Date(date)
    function isValidDate (d: string | number | Date): boolean {
      return d instanceof Date && !isNaN(d as any)
    }

    if (isValidDate(objectDate)) {
      return fnsFormat(
        new Date(
          objectDate.setMinutes(
            objectDate.getMinutes() + objectDate.getTimezoneOffset()
          )
        ),
        stringFormat,
        { locale: es }
      )
    } else {
      console.error('date is not valid date')
      return 'NaD'
    }
  }

  static dateToFirebase (date: string): Timestamp | null {
    const dateFormated = FirebaseCRUD.transformAnyToDate(date)
    if (!dateFormated) return null
    return Timestamp.fromDate(dateFormated)
  }

  static deepFormatFirebaseDates (
    object: any,
    target: 'timestamp' | 'number' | 'date' | 'fieldDate'
  ) {
    return Dates.deepFormatObjectDates(object, target)
  }

  static uploadFile = (
    file: Blob | Uint8Array | ArrayBuffer,
    fieldName = '',
    cb = (progress: number = 0, downloadURL: string | null = null): void => { }
  ) => {
    const storageRef = (path = '') => ref(storage, path)
    const uuid = uidGenerator()
    const imageRef = storageRef(`${fieldName}/${uuid}`)
    const uploadTask = uploadBytesResumable(imageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        cb(progress, null)
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL)
          cb(100, downloadURL)
        })
      }
    )
    /*   uploadBytes(storageRef(storagePath), file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      } */
  }

  static normalizeDocs = (docs = []) =>
    docs?.map((doc) => this.normalizeDoc(doc))

  static normalizeDoc = (doc: any) => {
    if (!doc?.exists()) return null // The document  not exist
    const data = doc.data()
    const id = doc.id

    const res = FirebaseCRUD.deepFormatFirebaseDates(data, 'number')

    return {
      id,
      ...res
    }
  }

  static formatResponse = (ok: boolean, type: string, res: any) => {
    if (!ok) throw new Error(type)
    const formatedType = type.toUpperCase()
    return { type: formatedType, ok, res }
  }

  async setDoc (itemId: string, newItem: object) {
    const currentUser = getAuth().currentUser

    const item = {
      id: itemId,
      updatedAt: new Date(),
      createdAt: new Date(),
      userId: currentUser?.uid,
      ...newItem
    }
    await setDoc(doc(db, this.collectionName, itemId), item)
    return { ...item }
  }

  async create (item: object) {
    const currentUser = getAuth().currentUser

    const newItem = {
      updatedAt: new Date(),
      createdAt: new Date(),
      userId: currentUser?.uid,
      ...item
    }

    const itemDatesToFirebaseTimestamp = FirebaseCRUD.deepFormatFirebaseDates(
      newItem,
      'number'
    )
    console.log(itemDatesToFirebaseTimestamp)

    return await addDoc(
      collection(db, this.collectionName),
      itemDatesToFirebaseTimestamp
    )
      .then((res) =>
        FirebaseCRUD.formatResponse(true, `${this.collectionName}_CREATED`, res)
      )
      .catch((err) => console.error(err))
  }

  async update (itemId: string, item: object) {
    const newItem = {
      ...FirebaseCRUD.deepFormatFirebaseDates(
        { ...item, updatedAt: new Date() },
        'number'
      )
    }
    return await updateDoc(doc(db, this.collectionName, itemId), newItem)
      .then((res) =>
        FirebaseCRUD.formatResponse(true, `${this.collectionName}_UPDATED`, res)
      )
      .catch((err) => console.error(err))
  }

  async delete (itemId: string) {
    return await deleteDoc(doc(db, this.collectionName, itemId))
      .then((res) =>
        FirebaseCRUD.formatResponse(true, `${this.collectionName}_DELETED`, res)
      )
      .catch((err) => console.error(err))
  }

  async get (itemId: string) {
    /**
     * get a single document from the collection
     * @param itemId the id of the document to get
     */
    const ref = doc(db, this.collectionName, itemId)
    const docSnap = await getDoc(ref)
    return FirebaseCRUD.normalizeDoc(docSnap)
  }
  async getMany (filters: any[]) {
    /**
     * * get all documents in a collection implmementing filters
     * @param filters: where(itemField,'==','value')
     */
    const q = query(collection(db, this.collectionName), ...filters)

    const querySnapshot = await getDocs(q)
    const res: ({ id: any } | null)[] = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      res.push(FirebaseCRUD.normalizeDoc(doc))
    })
    return res
  }

  async listen (itemId: string, cb: CallableFunction) {
    const q = doc(db, this.collectionName, itemId)
    onSnapshot(q, (doc) => {
      cb(FirebaseCRUD.normalizeDoc(doc))
    })
  }

  async listenDocs (filters: any, cb: CallableFunction) {
    /**
     * listen all documents in a collection implmementing filters
     * @param filters: where(itemField,'==','value')
     */

    if (!filters) return console.error('Should have filters implentade')
    const collectionRef = collection(db, this.collectionName)
    const q = query(collectionRef, ...filters)
    onSnapshot(q, (querySnapshot) => {
      const res: any[] = []
      querySnapshot.forEach((doc) => {
        res.push(FirebaseCRUD.normalizeDoc(doc))
      })
      cb(res)
    })
  }

  async listenDocsByFilters (filters: any, cb: CallableFunction) {
    /**
     * listen all documents in a collection implmementing filters
     * @param filters[]: where(itemField,'==','value')
     */

    if (!filters) return console.error('Should have filters implentade')
    const q = query(collection(db, this.collectionName), ...filters)

    onSnapshot(q, (querySnapshot) => {
      const res: any[] = []
      querySnapshot.forEach((doc) => {
        res.push(FirebaseCRUD.normalizeDoc(doc))
      })
      cb(res)
    })
  }

  async listenAll (cb: CallableFunction) {
    /**
     * listen all documents in a collection
     *
     */
    const q = query(collection(db, this.collectionName))

    onSnapshot(q, (querySnapshot) => {
      const res: any[] = []
      querySnapshot.forEach((doc) => {
        res.push(FirebaseCRUD.normalizeDoc(doc))
      })
      cb(res)
    })
  }

  static transformAnyToDate = (date: unknown): Date | null => {
    if (!date) return null
    if (date instanceof Timestamp) {
      return date.toDate()
    } else if (date instanceof Date) {
      return date
    } else if (typeof date === 'number') {
      return new Date(date)
    } else if (typeof date === 'string') {
      let aux = new Date(date)
      if (isNaN(aux.getTime())) {
        return null
      } else {
        return aux
      }
    } else {
      console.error('date is not valid date')
      return null
    }
  }
}
