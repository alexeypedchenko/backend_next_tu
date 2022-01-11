import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import PlaceForm from '../../../components/PlaceForm/PlaceForm'
import { getDbDoc } from '../../../firebase/firebaseFirestore'
import Button from '@mui/material/Button'

const Index = () => {
  const router = useRouter()
  const { id } = router.query
  const [place, setPlace] = useState(null)

  useEffect(() => {
    if (id) {
      getDbDoc('places', id).then(setPlace)
    }
  }, [id])

  return (
    <div>
      <div className="page-head">
        <h1>Редактировать</h1>
        <Button variant="contained" onClick={() => router.push('/places')}>
          Назад
        </Button>
      </div>
      {place && (<PlaceForm isUpdate propPlace={place} />)}
    </div>
  )
}

export default Index
