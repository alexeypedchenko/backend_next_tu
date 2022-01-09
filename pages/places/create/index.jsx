import { useRouter } from 'next/router'
import React from 'react'
import PlaceForm from '../../../components/PlaceForm/PlaceForm'
import Button from '@mui/material/Button'

const Index = () => {
  const router = useRouter()

  return (
    <div>
      <div className="page-head">
        <h1>Создать новое место</h1>
        <Button variant="contained" onClick={() => router.push('/places')}>
          Назад
        </Button>
      </div>

      <PlaceForm />
    </div>
  )
}

export default Index
