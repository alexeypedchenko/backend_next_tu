import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { addDbDoc, setDbDoc } from '../../firebase/firebaseFirestore'
import { PAGE } from '../../models';
import Button from '@mui/material/Button';

const ItemCreate = ({ model, collection }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const createNew = async () => {
    if (model === null || collection === null) return
    setIsLoading(true)
    try {
      const docId = await addDbDoc(collection, model)
      await setDbDoc('pages', docId, PAGE)
      await setDbDoc('_storage', docId, {
        folder: docId,
        files: [],
      })
      toast.success('New item created successfully')
      router.push(`/${collection}/${docId}`)
    } catch (error) {
      console.log('error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="contained" disabled={isLoading} onClick={createNew}>
      {isLoading ? 'Создаем...' : 'Создать новый'}
    </Button>
  )
};

ItemCreate.defaultProps = {
  model: null,
  collection: null,
}

export default ItemCreate;
