import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getDbDoc } from '../../firebase/firebaseFirestore'
import Button from '@mui/material/Button'

const FormEdit = ({ id, collection, Form }) => {
  const router = useRouter()
  const [object, setObject] = useState(null)
  const [page, setPage] = useState(null)

  useEffect(() => {
    if (id) {
      getDbDoc(collection, id).then(setObject)
      getDbDoc('pages', id).then(setPage)
    }
  }, [id])

  return (
    <div>
      <div className="page-head">
        <h1>Редактировать</h1>
        <Button variant="contained" onClick={() => router.push(`/${collection}`)}>
          Назад
        </Button>
      </div>
      {object && page && (<Form propObject={object} propPage={page} />)}
    </div>
  )
}

export default FormEdit
