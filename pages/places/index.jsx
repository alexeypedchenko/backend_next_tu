import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getDbDocsByOrder } from '../../firebase/firebaseFirestore'
import Table from '../../components/Table/Table'
import ItemDelete from '../../components/FormBlocks/ItemDelete'
import ItemCreate from '../../components/FormBlocks/ItemCreate'

import Button from '@mui/material/Button'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { Context } from '../../components/Layout/DefaultLayout'
import { PLACE } from '../../models'

const Index = () => {
  const collection = 'places'
  const router = useRouter()
  const { places, setPlaces } = useContext(Context)
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)

  useEffect(() => {
    getDbDocsByOrder('places', 'createdAt')
      .then(setPlaces)
  }, [])

  return (
    <div>
      <div className="page-head">
        <h1>Places</h1>
        <ItemCreate model={PLACE} collection={collection} />
      </div>

      <Table
        length={places.length}
        head={['Название', 'Опубликовано', 'Действия']}
        setStart={setStart}
        setEnd={setEnd}
      >
        {places
          .slice(start, end)
          .map((place) => (
            <TableRow key={place.id}>
              <TableCell component="th" scope="row">
                <Link href={`/places/${place.id}`}>
                  <a>
                    {place.name} - {place.id}
                  </a>
                </Link>
              </TableCell>
              <TableCell align="right">
                {place.isPublished ? 'Да' : 'Нет'}
              </TableCell>
              <TableCell align="right">
                <Button
                  style={{ marginRight: 10 }}
                  variant="contained"
                  size="small"
                  color="info"
                  onClick={() => router.push(`/places/${place.id}`)}
                >
                  Изменить
                </Button>
                <ItemDelete
                  id={place.id}
                  collection={collection}
                  onDelete={() => setPlaces(places.filter((plc) => plc.id !== place.id))}
                />
              </TableCell>
            </TableRow>
          ))}
      </Table>
    </div>
  )
}

export default Index
