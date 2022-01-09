import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { getDbDocs, getDbDocsByOrder, deleteDbDoc } from '../../firebase/firebaseFirestore'
import AlertDialog from '../../components/Dialog/Dialog'
import Button from '@mui/material/Button'
import Link from 'next/link'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'

const Index = () => {
  const router = useRouter()
  const [places, setPlaces] = useState([])

  useEffect(() => {
    // getDbDocs('places')
    getDbDocsByOrder('places', 'createdAt').then((docs) => {
      setPlaces(docs)
    })
  }, [])

  const deleteDoc = (id) => {
    deleteDbDoc('places', id).then((docId) => {
      setPlaces(places.filter((place) => place.id !== docId))
    })
  }

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
        <Button variant="contained" onClick={() => router.push('/places/create')}>
          Создать новое место
        </Button>
      </div>

      <Paper>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Actions</TableCell>
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
                      <Button
                        style={{ marginRight: 10 }}
                        variant="contained"
                        size="small"
                        color="info"
                        onClick={() => router.push(`/places/${place.id}`)}
                      >
                        Изменить
                      </Button>
                      <AlertDialog
                        title={`Вы действительно хотите удалить ${place.name}?`}
                        btnText="Удалить"
                        color="error"
                        ok={() => deleteDoc(place.id)}
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
