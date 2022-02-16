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
  getDoc,
  updateDoc,
  doc,
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
  doc.createdAt = new Date().toLocaleString('uk-Ua')
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

export const uploadFile = (file, name, folder = '') => new Promise(async (res, rej) => {
  let storagePath = name

  if (folder) {
    storagePath = `${folder}/${name}`
  }

  const storageRef = ref(storage, storagePath)
  const snapshot = await uploadBytes(storageRef, file)
  const url = await getDownloadURL(snapshot.ref)
  const doc = { url, name, storagePath }

  if (folder) {
    const docData = await getDbDoc(folder)
    docData.files.push(doc)
    updateDbDoc(collectionName, folder, docData)
    res(docData)
    return
  }

  const docData = await addDbDoc(collectionName, doc)
  console.log('Uploaded successfully!')
  res(docData)
})

export const getDbDoc = (docId, collectionName = '_storage') => new Promise(async (res, rej) => {
  const docRef = doc(db, collectionName, docId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    res({ id: docId, ...docSnap.data() })
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!")
    rej(null)
  }
})

export const updateDbDoc = (collectionName, docId, docData) => new Promise(async (res, rej) => {
  docData.changedAt = new Date().toLocaleString('uk-Ua')
  delete docData.id
  const docRef = doc(db, collectionName, docId)
  try {
    const updateTimestamp = await updateDoc(docRef, docData)
    res(true)
  } catch (error) {
    console.log('error:', error)
    rej(error)
  }
})
