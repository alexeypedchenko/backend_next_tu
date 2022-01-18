import { initApp } from './firebase'
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
initApp()
const db = getFirestore()

export const addDbDoc = (collectionName, doc) => new Promise(async (res, rej) => {
  // serverTimestamp
  doc.createdAt = serverTimestamp()
  doc.changedAt = serverTimestamp()
  try {
    const docRef = await addDoc(collection(db, collectionName), doc)
    console.log("Document written with ID: ", docRef.id)
    res(docRef.id)
  } catch (e) {
    console.error("Error adding document: ", e)
    rej(e)
  }
})
export const setDbDoc = async (collectionName, docId, docData) => {
  docData.createdAt = serverTimestamp()
  docData.changedAt = serverTimestamp()
  try {
    await setDoc(doc(db, collectionName, docId), docData)
  } catch (error) {
    console.log('error:', error)
  }
}
export const getDbDoc = (collectionName, docId) => new Promise(async (res, rej) => {
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
  docData.changedAt = serverTimestamp()
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
export const deleteDbDoc = (collectionName, docId) => new Promise(async (res, rej) => {
  try {
    await deleteDoc(doc(db, collectionName, docId))
    res(docId)
  } catch (error) {
    console.log('error:', error)
    rej(error)
  }
})
export const getDbDocs = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName))
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => `, doc.data())
  })
}
export const getDbDocsByOrder = (collectionName, orderField, desc = true) => new Promise(async (res, rej) => {
  // "asc" - ASC (ASCENDING - дословно "по возрастанию")
  // "desc" - DESC (DESCENDING - дословно "по убыванию")

  try {
    const sortDirection = desc ? 'desc' : 'asc'
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

export default db
