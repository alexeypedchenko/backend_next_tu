import { initApp } from './firebase'
import {
  getStorage,
  ref,
  deleteObject,
  listAll,

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

export const listAllMod = (path = 'gngzkdjqe5qfrxpjvlw8/subfolder') => new Promise((res, rej) => {
  const listRef = ref(storage, path);
  console.log('listRef:', listRef)

  // Find all the prefixes and items.
  listAll(listRef)
    .then((res) => {
      console.log('res:', res)
      res.prefixes.forEach((folderRef) => {
        console.log('folderRef:', folderRef)
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
      });
      res.items.forEach((itemRef) => {
        console.log('itemRef:', itemRef)
        // All the items under listRef.
      });
    }).catch((error) => {
      // Uh-oh, an error occurred!
    });
})
