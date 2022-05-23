import React, { useState, useMemo, useContext } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { toast } from 'react-toastify';

import { updateDbDoc } from '../../firebase/firebaseFirestore'
import { setChangeState } from '../../utils/setChangeState'
import { LOCATION, PAGE } from '../../models';

import Tabs from '../Tabs/Tabs';
import PageBuilder from '../PageBuilder/PageBuilder'
import FormDescription from '../FormBlocks/FormDescription';
import FormHead from '../FormBlocks/FormHead';

import Grid from '@mui/material/Grid'

import { Context } from '../Layout/DefaultLayout'

const LocationForm = ({ propObject, propPage }) => {
  const collection = 'locations'
  const [location, setLocation] = useState(propObject)
  const [page, setPage] = useState(propPage)
  const [isLoading, setIsLoading] = useState(false)
  const { places } = useContext(Context)
  console.log('places:', places)

  const handleChange = (event) => setChangeState(event, location, setLocation)

  const send = async () => {
    setIsLoading(true)
    const id = location.id
    try {
      await updateDbDoc(collection, id, { ...location })
      await updateDbDoc('pages', id, { ...page })
      toast.success(`Location: ${location.name} updated`)
    } catch (error) {
      console.log('error:', error)
    } finally {
      setIsLoading(false)
      return
    }
  }

  if (!location || !page) {
    return (
      <p>load</p>
    )
  }

  const main = (
    <Grid container spacing={4}>
      {/* left column */}
      <FormDescription
        object={location}
        onChange={handleChange}
        setImage={(file) => setLocation({ ...location, image: file.url })}
      />
    </Grid>
  )

  const pageBuilder = (
    <DndProvider backend={HTML5Backend}>
      <PageBuilder
        blocks={page.blocks}
        setBlocks={(blocks) => setPage({ ...page, blocks })}
        storage={location.id}
      />
    </DndProvider>
  )

  return (
    <div>
      <FormHead
        object={location}
        collection={collection}
        isLoading={isLoading}
        onChange={handleChange}
        onSend={send}
      />

      <Tabs content={[
        { title: 'Основное', content: main },
        { title: 'Конструктор страницы', content: pageBuilder },
      ]} />
    </div>
  )
}

LocationForm.defaultProps = {
  propObject: {
    ...LOCATION,
  },
  propPage: {
    ...PAGE,
  }
}

export default LocationForm