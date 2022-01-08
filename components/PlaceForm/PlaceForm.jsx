import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { addDbDoc, updateDbDoc } from '../../firebase/firebaseFirestore'

const defaultPlace = {
  name: 'name',
  description: 'description',
}

const PlaceForm = ({ place }) => {
  const [load, setLoad] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const [fields, setFields] = useState({ name: 'name', description: 'description' })
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 })

  useEffect(() => {
    console.log('useEffect place:')
    if (place) {
      setIsEdit(true)
      setCoordinates({ ...place.coordinates })
      setFields({name: place.name, description: place.description})
    }
  }, [place])

  const onChangeFields = (event) => {
    const { name, value } = event.target
    setFields({ ...fields, [name]: value })
  }
  const onChangeCoordinates = (event) => {
    const { name, value } = event.target
    setCoordinates({ ...coordinates, [name]: value })
  }

  const send = async () => {
    let newPlace = {}
    if (isEdit) {
      const id = place.id
      delete place.id
      newPlace = {...place, ...fields}
      newPlace.coordinates = { ...coordinates }
      console.log('isEdit:')
      console.log('id:', id)
      updateDbDoc('places', id, newPlace)
      return
    }

    newPlace = { ...fields }
    newPlace.coordinates = { ...coordinates }

    addDbDoc('places', newPlace).then((docId) => {
      console.log('create new place:', docId)
    })

  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        {Object.keys(fields).map((key) => (
          <TextField
            style={{ marginBottom: 20, width: '100%' }}
            key={key}
            label={key}
            name={key}
            variant="outlined"
            placeholder={`Введите ${key}`}
            value={fields[key]}
            onChange={onChangeFields}
          />
        ))}
      </Grid>
      <Grid item xs={6} md={6}>
        {Object.keys(coordinates).map((key) => (
          <TextField
            style={{ marginBottom: 20, width: '100%' }}
            key={key}
            label={key}
            name={key}
            variant="outlined"
            placeholder={`Введите ${key}`}
            value={coordinates[key]}
            onChange={onChangeCoordinates}
          />
        ))}
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button variant="contained" onClick={send}>
          Отправить
        </Button>
      </Grid>
    </Grid>
  )
}

export default PlaceForm
