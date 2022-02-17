import React, { useState } from 'react';
import { toast } from 'react-toastify'
import { deleteDbDoc } from '../../firebase/firebaseFirestore'
import AlertDialog from '../Dialog/Dialog'
import { deleteStorageItems } from '../../firebase/firebaseStorage'

const ItemDelete = ({ id, collection, onDelete, ...props }) => {
  const [isLoading, setIsLoading] = useState(false)

  const deleteDoc = async () => {
    if (id === null || collection === null) return
    setIsLoading(true)
    try {
      await deleteDbDoc(collection, id)
      await deleteDbDoc('pages', id)
      await deleteDbDoc('_storage', id)
      deleteStorageItems(id)
      onDelete()
      toast.warn('Object was deleted')
    } catch (error) {
      console.log('error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog
      title="Вы действительно хотите удалить объект?"
      btnText="Удалить"
      color="error"
      isLoading={isLoading}
      ok={() => deleteDoc()}
      {...props}
    />
  )
};

ItemDelete.defaultProps = {
  collection: null,
  id: null,
  onDelete: () => { }
}

export default ItemDelete;
