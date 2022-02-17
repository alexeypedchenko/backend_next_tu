import React from 'react'
import { useRouter } from 'next/router'
import ItemDelete from './ItemDelete'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

const FormHead = ({ object, isLoading, collection, onChange, onSend }) => {
  const router = useRouter()

  return (
    <Grid container justifyContent="space-between" spacing={2} sx={{marginBottom: 1}}>
      <Grid item>
        <FormControlLabel
          control={
            <Switch
              name="isPublished"
              checked={object.isPublished}
              onChange={onChange}
              color="success"
            />
          }
          label="Опубликован"
        />
      </Grid>
      <Grid item>
        <ItemDelete
          id={object.id}
          collection={collection}
          onDelete={() => router.push(`/${collection}`)}
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

export default FormHead
