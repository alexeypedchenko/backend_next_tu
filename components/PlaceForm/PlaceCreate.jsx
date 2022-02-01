import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { addDbDoc, setDbDoc } from '../../firebase/firebaseFirestore'
import { PLACE, PAGE } from '../../models';
import Button from '@mui/material/Button';

const PlaceCreate = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const createNewPlace = async () => {
    setIsLoading(true)
    try {
      const docId = await addDbDoc('places', PLACE)
      await setDbDoc('pages', docId, PAGE)
      await setDbDoc('_storage', docId, {
        folder: docId,
        files: [],
      })
      toast.success('Place created successfully')
      router.push(`/places/${docId}`)
    } catch (error) {
      console.log('error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="contained" disabled={isLoading} onClick={createNewPlace}>
      {isLoading ? 'Создаем...' : 'Создать новое место'}
    </Button>
  )
};

export default PlaceCreate;
