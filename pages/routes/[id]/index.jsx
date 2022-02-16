import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import RouteForm from '../../../components/RouteForm/RouteForm'
import { getDbDoc } from '../../../firebase/firebaseFirestore'
import Button from '@mui/material/Button'

const Index = () => {
  const router = useRouter()
  const { id } = router.query
  const [route, setRoute] = useState(null)
  const [page, setPage] = useState(null)
  console.log('route:', route)

  useEffect(() => {
    if (id) {
      getDbDoc('routes', id).then(setRoute)
      getDbDoc('pages', id).then(setPage)
    }
  }, [id])

  return (
    <div>
      <div className="page-head">
        <h1>Редактировать</h1>
        <Button variant="contained" onClick={() => router.push('/routes')}>
          Назад
        </Button>
      </div>
      <div>
        <h1>id: {id}</h1>
      </div>
      {route && page && (<RouteForm isUpdate propRoute={route} propPage={page} />)}
    </div>
  )
}

export default Index
