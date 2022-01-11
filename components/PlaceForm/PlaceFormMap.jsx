import React from 'react'
import Map from '../Map/Map'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

const PlaceFormMap = ({place, onChange, setCoordinates}) => {
  return (
    <Grid item xs={12} sm={6}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            style={{ marginBottom: 20, width: '100%' }}
            size="small"
            label="Lat"
            type="number"
            placeholder="Введите lat места"
            value={place.coordinates.lat}
            name="coordinates.lat"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            style={{ marginBottom: 20, width: '100%' }}
            size="small"
            label="Lng"
            type="number"
            placeholder="Введите lng места"
            value={place.coordinates.lng}
            name="coordinates.lng"
            onChange={onChange}
          />
        </Grid>
      </Grid>

      <Map markers={[place]} setCoordinates={setCoordinates} />
    </Grid>
  )
}

export default PlaceFormMap
