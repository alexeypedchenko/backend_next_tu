import React from 'react'
import RouteDelete from './RouteDelete'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

const RouteFormHead = ({ route, isLoading, onChange, onDelete, onSend }) => {
  return (
    <Grid container justifyContent="space-between" spacing={2} sx={{marginBottom: 1}}>
      <Grid item>
        <FormControlLabel
          control={
            <Switch
              name="isPublished"
              checked={route.isPublished}
              onChange={onChange}
              color="success"
            />
          }
          label="Опубликован"
        />
      </Grid>
      <Grid item>
        <RouteDelete
          route={route}
          onDelete={onDelete}
          size="medium"
        />

        <div style={{ width: 15, display: 'inline-block' }}></div>
        <Button disabled={isLoading} color="success" variant="contained" onClick={onSend}>
          Обновить
        </Button>
      </Grid>
    </Grid>
  )
}

export default RouteFormHead
