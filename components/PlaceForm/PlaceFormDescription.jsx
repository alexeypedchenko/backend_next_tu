import React from 'react'
import FileManager from '../FileManager/FileManager'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { regions, tags } from '../../models/other'

const PlaceFormDescription = ({ place, onChange, setImage }) => {
  return (
    <Grid item xs={12} sm={6}>
      <FileManager
        title="Выбрать изображение"
        folder={place.id}
        onSelect={setImage}
      />
      {place.image && (<img src={place.image} style={{
        maxWidth: '100%',
        width: 300,
        height: 'auto',
        display: 'block',
        marginTop: 20,
        marginBottom: 20,
      }} />)}

      <TextField
        style={{ marginBottom: 20, width: '100%' }}
        label="Название"
        placeholder="Введите название места"
        value={place.name}
        name="name"
        onChange={onChange}
      />

      <span>Описание</span>
      <TextareaAutosize
        minRows={1}
        placeholder="Введите описание места"
        defaultValue={place.description}
        name="description"
        onChange={onChange}
        style={{
          width: '100%',
          fontFamily: 'inherit',
          padding: '16.5px 14px',
          fontSize: 16,
          marginBottom: 20,
        }}
      />

      <FormControl sx={{ marginBottom: '20px', width: '100%' }}>
        <InputLabel id="region-label">Регион</InputLabel>
        <Select
          labelId="region-label"
          name="region"
          value={place.region}
          onChange={onChange}
          input={<OutlinedInput label="Регион" />}
        >
          {regions.map((region) => (<MenuItem key={region} value={region}>{region}</MenuItem>))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="selectTag">Теги</InputLabel>
        <Select
          labelId="selectTag"
          id="demo-simple-select"
          value={place.tags}
          label="Теги"
          name="tags"
          multiple
          onChange={onChange}
        >
          {tags.map((tag) => (
            <MenuItem key={tag} value={tag}>{tag}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  )
}

export default PlaceFormDescription
