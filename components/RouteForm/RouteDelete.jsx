import React, { useState } from 'react';
import { toast } from 'react-toastify'
import { deleteDbDoc } from '../../firebase/firebaseFirestore'
import AlertDialog from '../Dialog/Dialog'
import { deleteStorageItems } from '../../firebase/firebaseStorage'

const RouteDelete = ({ route, onDelete, ...props }) => {
  const [isLoading, setIsLoading] = useState(false)

  const deleteDoc = async () => {
    const { id } = route
    if (id === null) return
    setIsLoading(true)
    try {
      await deleteDbDoc('routes', id)
      await deleteDbDoc('pages', id)
      await deleteDbDoc('_storage', id)
      deleteStorageItems(id)
      onDelete()
      toast.warn('Route was deleted')
    } catch (error) {
      console.log('error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog
      title={`Вы действительно хотите удалить ${route.name}?`}
      btnText="Удалить"
      color="error"
      isLoading={isLoading}
      ok={() => deleteDoc()}
      {...props}
    />
  )
};

RouteDelete.defaultProps = {
  route: {
    name: '',
    id: null
  },
  onDelete: () => { }
}

export default RouteDelete;
