import React, { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getDbDocs, getDbDocsByOrder } from '../../firebase/firebaseFirestore'
import Button from '@mui/material/Button'
import PlaceCreate from '../../components/PlaceForm/PlaceCreate'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import PlaceDelete from '../../components/PlaceForm/PlaceDelete'

const Index = () => {
  const router = useRouter()
  const [places, setPlaces] = useState([])

  useEffect(() => {
    // getDbDocs('places')
    getDbDocsByOrder('places', 'createdAt').then((docs) => {
      setPlaces(docs)
    })
  }, [])

  // for table
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const { start, end } = useMemo(() => ({
    start: page * rowsPerPage,
    end: page * rowsPerPage + rowsPerPage,
  }), [page, rowsPerPage])

  return (
    <div>
      <div className="page-head">
        <h1>Places</h1>
        <PlaceCreate />
      </div>

      <Paper>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Название - id</TableCell>
                <TableCell align="right">Опубликовано</TableCell>
                <TableCell align="right">Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
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
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[3, 5, 10, 25]}
          component="div"
          count={places.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}

export default Index
