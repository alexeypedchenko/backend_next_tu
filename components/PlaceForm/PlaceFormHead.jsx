import React from 'react'
import PlaceDelete from './PlaceDelete'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

const PlaceFormHead = ({ place, isLoading, isUpdate, onChange, onDelete, onSend }) => {
  return (
    <Grid container justifyContent="space-between" spacing={2} sx={{marginBottom: 1}}>
      <Grid item>
        <FormControlLabel
          control={
            <Switch
              name="isPublished"
              checked={place.isPublished}
              onChange={onChange}
              color="success"
            />
          }
          label="Опубликован"
        />
      </Grid>
      <Grid item>
        {isUpdate && (<>
          <PlaceDelete
            place={place}
            onDelete={onDelete}
            size="medium"
          />

          <div style={{ width: 15, display: 'inline-block' }}></div>
        </>)}
        <Button disabled={isLoading} color="success" variant="contained" onClick={onSend}>
          {isUpdate ? 'Обновить' : 'Добавить'}
        </Button>
      </Grid>
    </Grid>
  )
}

export default PlaceFormHead
