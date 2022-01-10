import { initApp } from '../../../firebase/firebase'
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage'

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
initApp()

const storage = getStorage()
const db = getFirestore()

const collectionName = '_storage'

export const addDbDoc = (collectionName, doc) => new Promise(async (res, rej) => {
  // serverTimestamp
  doc.createdAt = serverTimestamp()
  try {
    const docRef = await addDoc(collection(db, collectionName), doc)
    doc.createdAt = new Date()
    res(doc)
  } catch (e) {
    rej(e)
  }
})

export const getDbDocsByOrder = (desc = true) => new Promise(async (res, rej) => {
  // "asc" - ASC (ASCENDING - дословно "по возрастанию")
  // "desc" - DESC (DESCENDING - дословно "по убыванию")

  try {
    const sortDirection = desc ? 'desc' : 'asc'
    const orderField = 'createdAt'
    const collectionRef = collection(db, collectionName)
    const biggerThanSf = query(collectionRef, orderBy(orderField, sortDirection))
    const querySnapshot = await getDocs(biggerThanSf)
    const docs = []
    querySnapshot.forEach((doc) => {
      docs.push({
        id: doc.id,
        ...doc.data()
      })
    })
    res(docs)
  } catch (err) {
    console.log('err:', err)
    rej(err)
  }
})

export const uploadFile = (file, name, folder = '') => new Promise((res, rej) => {
  const storagePath = folder ? `${folder}/${name}` : name
  const storageRef = ref(storage, storagePath)

  uploadBytes(storageRef, file).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((url) => {
      const doc = { url, name, folder, storagePath }
      addDbDoc(collectionName, doc).then((doc) => {
        console.log('Uploaded successfully!')
        res(doc)
      })
    })
  })
})
