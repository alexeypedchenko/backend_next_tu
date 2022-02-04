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
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';

import { regions } from '../../models/other'

const tags = [
  'tag 1',
  'tag 2',
  'tag 3',
  'tag 4',
  'tag 5',
]

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

      <Autocomplete
        sx={{ marginBottom: '20px', width: '100%' }}
        multiple
        onChange={(_, value) => onChange({target: {value, name: 'tags'}})}
        options={tags}
        value={place.tags}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (<Chip label={option} {...getTagProps({ index })} />))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Теги"
            placeholder="Тег"
          />
        )}
      />
    </Grid>
  )
}

export default PlaceFormDescription
