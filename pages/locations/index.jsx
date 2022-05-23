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
import { LOCATION } from '../../models'

const Index = () => {
  const collection = 'locations'
  const router = useRouter()
  // const { places, setPlaces } = useContext(Context)
  const [locations, setLocations] = useState([])
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)

  useEffect(() => {
    getDbDocsByOrder('locations', 'createdAt')
      .then(setLocations)
  }, [])

  return (
    <div>
      <div className="page-head">
        <h1>Locations</h1>
        <ItemCreate model={LOCATION} collection={collection} />
      </div>

      <Table
        length={locations.length}
        head={['Название', 'Опубликовано', 'Действия']}
        setStart={setStart}
        setEnd={setEnd}
      >
        {locations
          .slice(start, end)
          .map((location) => (
            <TableRow key={location.id}>
              <TableCell component="th" scope="row">
                <Link href={`/locations/${location.id}`}>
                  <a>
                    {location.name} - {location.id}
                  </a>
                </Link>
              </TableCell>
              <TableCell align="right">
                {location.isPublished ? 'Да' : 'Нет'}
              </TableCell>
              <TableCell align="right">
                <Button
                  style={{ marginRight: 10 }}
                  variant="contained"
                  size="small"
                  color="info"
                  onClick={() => router.push(`/locations/${location.id}`)}
                >
                  Изменить
                </Button>
                <ItemDelete
                  id={location.id}
                  collection={collection}
                  onDelete={() => setLocations(locations.filter((lctn) => lctn.id !== location.id))}
                />
              </TableCell>
            </TableRow>
          ))}
      </Table>
    </div>
  )
}

export default Index
