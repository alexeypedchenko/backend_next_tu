import { initApp } from './firebase'
import {
  getStorage,
  ref,
  deleteObject,
  listAll,
  getDownloadURL,
} from 'firebase/storage'

initApp()
const storage = getStorage()

export const deleteFile = (filePath) => new Promise((res, rej) => {
  // Create a reference to the file to delete
  const desertRef = ref(storage, filePath)

  // Delete the file
  deleteObject(desertRef)
    .then(() => res(true))
    .catch((error) => rej(false))
})

const getFolder = (ref) => new Promise(async (res, rej) => {
  listAll(ref)
    .then((res) => {
      res.prefixes.forEach((folderRef) => getFolder(folderRef))
      res.items.forEach((itemRef) => {
        deleteObject(itemRef)
        .then(() => console.log('File deleted successfully:', itemRef.name))
        .catch((error) => console.log('error:', error));
      })
    })
    .catch((error) => console.log('error:', error));
})

export const deleteStorageItems = (docId = false) => new Promise(async (res, rej) => {
  if (!docId) return

  const listRef = ref(storage, `/${docId}`)
  getFolder(listRef)
})
