import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getDbDocsByOrder } from '../../firebase/firebaseFirestore'
import PlaceCreate from '../../components/PlaceForm/PlaceCreate'
import PlaceDelete from '../../components/PlaceForm/PlaceDelete'
import Table from '../../components/Table/Table'

import Button from '@mui/material/Button'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { Context } from '../../components/Layouts/DefaultLayout'

const Index = () => {
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
        <PlaceCreate />
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
                <PlaceDelete
                  place={place}
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
