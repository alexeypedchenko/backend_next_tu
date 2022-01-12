import React from 'react'
import FileManager from '../FileManager/FileManager'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

const PlaceFormDescription = ({place, onChange, setImage}) => {
  return (
    <Grid item xs={12} sm={6}>
      <TextField
        style={{ marginBottom: 20, width: '100%' }}
        label="Название"
        placeholder="Введите название места"
        value={place.name}
        name="name"
        onChange={onChange}
      />
      <TextField
        style={{ marginBottom: 20, width: '100%' }}
        label="Описание"
        placeholder="Введите описание места"
        value={place.description}
        name="description"
        onChange={onChange}
      />
      <FileManager
        title="Выбрать изображение"
        onSelect={setImage}
      />
      {place.image && (<img src={place.image} style={{
        maxWidth: '100%',
        width: 300,
        height: 'auto',
        display: 'block',
        marginTop: 20,
      }} />)}
    </Grid>
  )
}

export default PlaceFormDescription