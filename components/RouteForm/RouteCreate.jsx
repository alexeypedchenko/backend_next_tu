import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { addDbDoc, setDbDoc } from '../../firebase/firebaseFirestore'
import { ROUTE, PAGE } from '../../models';
import Button from '@mui/material/Button';

const RouteCreate = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const createNewRoute = async () => {
    setIsLoading(true)
    try {
      const docId = await addDbDoc('routes', ROUTE)
      await setDbDoc('pages', docId, PAGE)
      await setDbDoc('_storage', docId, {
        folder: docId,
        files: [],
      })
      toast.success('Route created successfully')
      router.push(`/routes/${docId}`)
    } catch (error) {
      console.log('error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="contained" disabled={isLoading} onClick={createNewRoute}>
      {isLoading ? 'Создаем...' : 'Создать новой маршрут'}
    </Button>
  )
};

export default RouteCreate;
