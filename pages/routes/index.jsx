import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getDbDocsByOrder } from '../../firebase/firebaseFirestore'
import ItemCreate from '../../components/FormBlocks/ItemCreate'
import ItemDelete from '../../components/FormBlocks/ItemDelete'

import { ROUTE } from '../../models'

import Button from '@mui/material/Button'
import Table from '../../components/Table/Table'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { Context } from '../../components/Layout/DefaultLayout'

const Index = () => {
  const collection = 'routes'
  const router = useRouter()

  const [routes, setRoutes] = useState([])
  const { places, setPlaces } = useContext(Context)

  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)

  useEffect(() => {
    getDbDocsByOrder('routes', 'createdAt')
      .then(setRoutes)
    getDbDocsByOrder('places', 'createdAt')
      .then(setPlaces)
  }, [])

  return (
    <div>
      <div className="page-head">
        <h1>Маршруты</h1>
        <ItemCreate model={ROUTE} collection={collection} />
      </div>

      <Table
        length={routes.length}
        head={['Название', 'Опубликовано', 'Действия']}
        setStart={setStart}
        setEnd={setEnd}
      >
        {routes
          .slice(start, end)
          .map((route) => (
            <TableRow key={route.id}>
              <TableCell component="th" scope="row">
                <Link href={`/routes/${route.id}`}>
                  <a>
                    {route.name} - {route.id}
                  </a>
                </Link>
              </TableCell>
              <TableCell align="right">
                {route.isPublished ? 'Да' : 'Нет'}
              </TableCell>
              <TableCell align="right">
                <Button
                  style={{ marginRight: 10 }}
                  variant="contained"
                  size="small"
                  color="info"
                  onClick={() => router.push(`/routes/${route.id}`)}
                >
                  Изменить
                </Button>
                <ItemDelete
                  id={route.id}
                  collection={collection}
                  onDelete={() => setRoutes(routes.filter((rt) => rt.id !== route.id))}
                />
              </TableCell>
            </TableRow>
          ))}
      </Table>
    </div>
  )
}

export default Index
