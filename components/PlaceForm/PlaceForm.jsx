import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { addDbDoc, updateDbDoc } from '../../firebase/firebaseFirestore'
import Map from '../Map/Map'

const PlaceForm = ({ isUpdate, propPlace }) => {
  const [place, setPlace] = useState(propPlace)
  const [load, setLoad] = useState(false)

  const send = async () => {
    if (isUpdate) {
      const id = place.id
      const newPlace = {...place}
      delete newPlace.id
      updateDbDoc('places', id, newPlace)
      return
    }

    addDbDoc('places', place).then((docId) => {
      console.log('create new place:', docId)
    })
  }

  if (!place) {
    return (
      <p>load</p>
    )
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          style={{ marginBottom: 20, width: '100%' }}
          label="Название"
          variant="outlined"
          placeholder="Введите название места"
          value={place.name}
          onChange={(event) => setPlace({ ...place, name: event.target.value })}
        />
        <TextField
          style={{ marginBottom: 20, width: '100%' }}
          label="Описание"
          variant="outlined"
          placeholder="Введите описание места"
          value={place.description}
          onChange={(event) => setPlace({ ...place, description: event.target.value })}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              style={{ marginBottom: 20, width: '100%' }}
              size="small"
              label="Lat"
              type="number"
              variant="outlined"
              placeholder="Введите lat места"
              value={place.coordinates.lat}
              onChange={(event) => setPlace({
                ...place,
                coordinates: {
                  ...place.coordinates,
                  lat: event.target.value
                }
              })}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              style={{ marginBottom: 20, width: '100%' }}
              size="small"
              label="Lng"
              type="number"
              variant="outlined"
              placeholder="Введите lng места"
              value={place.coordinates.lng}
              onChange={(event) => setPlace({
                ...place,
                coordinates: {
                  ...place.coordinates,
                  lng: event.target.value
                }
              })}
            />
          </Grid>
        </Grid>
        <Map />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button variant="contained" onClick={send}>
          Отправить
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Map markers={[place]} setCoordinates={(coordinates) => setPlace({ ...place, coordinates })} />
      </Grid>
    </Grid>
  )
}

PlaceForm.defaultProps = {
  isUpdate: false,
  propPlace: {
    name: 'name',
    description: 'description',
    coordinates: { lat: 46.48, lng: 30.72 }
  }
}

export default PlaceForm
