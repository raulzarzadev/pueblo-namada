import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { getAuth } from "firebase/auth";
import { format as fnsFormat } from "date-fns"
import { v4 as uidGenerator } from 'uuid';

import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { db, storage } from ".";

type Target = 'firebase' | 'milliseconds' | 'date' | 'fieldDate'
export class FirebaseCRUD {
  constructor(
    private collectionName: string = '',

  ) { }

  static format = (date: string | number | Date, stringFormat = 'dd/MM/yy'): string => {
    if (!date) {
      console.error('not a date')
      return 'NaD'
    }
    const objectDate = new Date(date)
    function isValidDate(d: string | number | Date): boolean {
      return d instanceof Date && !isNaN(d as any)
    }

    if (isValidDate(objectDate)) {
      return fnsFormat(new Date(objectDate.setMinutes(objectDate.getMinutes() + objectDate.getTimezoneOffset())), stringFormat)
    } else {
      console.error('date is not valid date')
      return 'NaD'
    }

  }

  static dateToFirebase(date: string): Timestamp | null {
    const dateFormated = FirebaseCRUD.transformAnyToDate(date)
    if (!dateFormated) return null
    return Timestamp.fromDate(dateFormated)
  }



  static deepFormatFirebaseDates(
    object: any,
    target: 'firebase' | 'milliseconds' | 'date' | 'fieldDate',
  ) {
    const DATE_FIELDS = [
      'birth',
      'date',
      'createdAt',
      'updatedAt',
      'finishAt',
      'joinedAt',
      'startAt',
      'registryDate',
      'publishEnds',
      'publishStart',
      'lastUpdate',
      'endsAt',
      'startsAt',
    ]

    /* 
    const TARGETS = ['firebase', 'milliseconds', 'date', 'fieldDate']
    if (!TARGETS.includes(target)) return console.error('target must be one of:', TARGETS)
     */
    // target is firebase transform to Timestamp
    // target is milis transform to milis
    // target is date transofrm to Date
    // target is fieldDate transform to yyyy-mm-dd

    const objective = {
      firebase: (date: Date): Timestamp => {

        return Timestamp.fromDate(date)
      },
      milliseconds: (date: Date): number => date.getTime(),
      date: (date: Date): Date => date,
      fieldDate: (date: Date): string => FirebaseCRUD.format(date, 'yyyy-MM-dd')
    }


    /**
     * * if is an array, iterate over each item and transform it
     * 
     * * if is an object, iterate over each item and transform it
     *
     * * if is a valid field in DATE_FIELDS, transform it
     * 
     */




    function formatDatesTo(object: any, target: Target) {

      let aux_obj = { ...object }
      Object.keys(aux_obj).forEach(key => {

        const objProperty = aux_obj[key]

        if (DATE_FIELDS.includes(key)) {
          // * Is a valid field in DATE_FIELDS, transform it to @target
          const date = FirebaseCRUD.transformAnyToDate(objProperty)
          const res = date ? (objective[target](date)) : null
          aux_obj[key] = res

        } else if (typeof objProperty === 'object') {
          // * Is an object, iterate over each item and transform it
          formatDatesTo(objProperty, target)

        } else if (Array.isArray(objProperty)) {

          // * Is an array, iterate over each item and transform it
          objProperty.map(item => formatDatesTo(item, target))

        }
      })
      return aux_obj
    }



    return formatDatesTo(object, target)
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

  static normalizeDocs = (docs = []) =>
    docs?.map((doc) => this.normalizeDoc(doc))

  static normalizeDoc = (doc: any) => {
    if (!doc?.exists()) return null // The document  not exist
    const data = doc.data()
    const id = doc.id

    const res = FirebaseCRUD.deepFormatFirebaseDates(data, 'milliseconds')

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


  async create(item: object) {
    const currentUser = getAuth().currentUser

    const newItem = {
      createdAt: new Date(),
      userId: currentUser?.uid,
      ...item
    }

    const itemDatesToFirebaseTimestamp = FirebaseCRUD.deepFormatFirebaseDates(newItem, 'firebase')

    return await addDoc(collection(db, this.collectionName), itemDatesToFirebaseTimestamp)
      .then((res) => FirebaseCRUD.formatResponse(true, `${this.collectionName}_CREATED`, res))
      .catch((err) => console.error(err))
  }

  async update(itemId: string, item: object) {
    return await updateDoc(doc(db, this.collectionName, itemId), {
      ...FirebaseCRUD.deepFormatFirebaseDates({ ...item, updatedAt: new Date() }, 'firebase')
    })
      .then(res => FirebaseCRUD.formatResponse(true, `${this.collectionName}_UPDATED`, res),)
      .catch(err => console.error(err))
  }

  async delete(itemId: string) {
    return await deleteDoc(doc(db, this.collectionName, itemId))
      .then(res => FirebaseCRUD.formatResponse(true, `${this.collectionName}_DELETED`, res))
      .catch(err => console.error(err))
  }

  async get(itemId: string) {
    /**
    * get a single document from the collection
    * @param itemId the id of the document to get
    */
    const ref = doc(db, this.collectionName, itemId)
    const docSnap = await getDoc(ref)
    return FirebaseCRUD.normalizeDoc(docSnap)
  }



  async listen(itemId: string, cb: CallableFunction) {
    const q = doc(db, this.collectionName, itemId)
    onSnapshot(q, (doc) => {
      cb(FirebaseCRUD.normalizeDoc(doc))
    })

  }


  async listenDocs(filters: any, cb: CallableFunction) {
    /**
    * listen all documents in a collection implmementing filters
    * @param filters: where(itemField,'==','value')
    */

    if (!filters) return console.error('Should have filters implentade')
    const q = query(
      collection(db, this.collectionName),
      filters
    )

    onSnapshot(q, (querySnapshot) => {
      const res: any[] = []
      querySnapshot.forEach((doc) => {
        res.push(FirebaseCRUD.normalizeDoc(doc))
      })
      cb(res)
    })

  }

  async listenDocsByFilters(filters: any, cb: CallableFunction) {
    /**
    * listen all documents in a collection implmementing filters
    * @param filters[]: where(itemField,'==','value')
    */

    if (!filters) return console.error('Should have filters implentade')
    console.log(filters)
    const q = query(
      collection(db, this.collectionName),
      ...filters
    )

    onSnapshot(q, (querySnapshot) => {
      const res: any[] = []
      querySnapshot.forEach((doc) => {
        res.push(FirebaseCRUD.normalizeDoc(doc))
      })
      cb(res)
    })

  }

  async listenAll(cb: CallableFunction) {
    /**
   * listen all documents in a collection 
   * 
   */
    const q = query(
      collection(db, this.collectionName),
    )

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




