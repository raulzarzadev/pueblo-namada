import { getAuth } from "firebase/auth";
import { format as fnsFormat } from "date-fns"

import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { db } from ".";

export class FirebaseCRUD {
  constructor(
    private collectionName: string = '',

  ) { }

  static format = (date: string | number | Date, stringFormat = 'dd/MM/yy'): string => {
    if (!date) {
      console.error('not a date')
      return 'NaD'
    }
    console.log(date)
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
      'lastUpdate'
    ]
    const TARGETS = ['firebase', 'milliseconds', 'date', 'fieldDate']


    if (!TARGETS.includes(target)) return console.error('target must be one of:', TARGETS)
    // target is firebase transform to Timestamp
    // target is milis transform to milis
    // target is date transofrm to Date
    // target is fieldDate transform to yyyy-mm-dd

    const transformAnyToDate = (date: unknown): Date | null => {
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



    const objective = {
      firebase: (date: Date): Timestamp => Timestamp.fromDate(date),
      milliseconds: (date: Date): number => date.getTime(),
      date: (date: Date): Date => date,
      fieldDate: (date: Date): string => FirebaseCRUD.format(date, 'yyyy-MM-dd')
    }

    let aux_obj = { ...object }

    Object.keys(aux_obj).forEach(key => {
      const objProperty = object[key]
      if (DATE_FIELDS.includes(key)) {
        const date = transformAnyToDate(objProperty)
        /* console.log('target', target) */
        const res = date ? (objective[target](date)) : null
        aux_obj[key] = res
        // console.log('res', res);

        // ***************************+RECURSIVO OBJECTS AND ARRAYS
        // if is object
      } else if (typeof objProperty === 'object') {
        FirebaseCRUD.deepFormatFirebaseDates(objProperty, target)
        // if is an array
      } else if (Array.isArray(objProperty)) {
        objProperty.map(item => FirebaseCRUD.deepFormatFirebaseDates(item, target))
      }
    })

    return { ...aux_obj }
  }

  static normalizeDocs = (docs = []) =>
    docs?.map((doc) => this.normalizeDoc(doc))

  static normalizeDoc = (doc: any) => {
    if (!doc?.exists()) return null // The document  not exist
    const data = doc.data()
    const id = doc.id

    const res = FirebaseCRUD.deepFormatFirebaseDates(data, 'fieldDate')

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
    console.log(currentUser)
    // if (!this.currentUser) return console.error('No user logged')
    return await addDoc(collection(db, this.collectionName), {
      ...FirebaseCRUD.deepFormatFirebaseDates({
        createdAt: new Date(),
        userId: currentUser?.uid,
        ...item
      }, 'firebase')
    })
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
}


