import React, { useState } from 'react';
import { toast } from 'react-toastify'
import { deleteDbDoc } from '../../firebase/firebaseFirestore'
import AlertDialog from '../Dialog/Dialog'
import { deleteStorageItems } from '../../firebase/firebaseStorage'

const PlaceDelete = ({ place, onDelete, ...props }) => {
  const [isLoading, setIsLoading] = useState(false)

  const deleteDoc = async () => {
    const { id } = place
    if (id === null) return
    setIsLoading(true)
    try {
      await deleteDbDoc('places', id)
      await deleteDbDoc('pages', id)
      await deleteDbDoc('_storage', id)
      deleteStorageItems(id)
      onDelete()
      toast.warn('Place was deleted')
    } catch (error) {
      console.log('error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog
      title={`Вы действительно хотите удалить ${place.name}?`}
      btnText="Удалить"
      color="error"
      isLoading={isLoading}
      ok={() => deleteDoc()}
      {...props}
    />
  )
};

PlaceDelete.defaultProps = {
  place: {
    name: '',
    id: null
  },
  onDelete: () => { }
}

export default PlaceDelete;
