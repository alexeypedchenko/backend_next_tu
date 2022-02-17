import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

import { updateDbDoc } from '../../firebase/firebaseFirestore'
import { setChangeState } from '../../utils/setChangeState'
import { ROUTE, PAGE } from '../../models';

import Tabs from '../Tabs/Tabs';
import PageBuilder from '../PageBuilder/PageBuilder'
import FormDescription from '../FormBlocks/FormDescription';
import FormHead from '../FormBlocks/FormHead';

import Grid from '@mui/material/Grid'

const PlaceForm = ({ propObject, propPage }) => {
  const collection = 'routes'
  const [route, setRoute] = useState(propObject)
  const [page, setPage] = useState(propPage)
  const [coordinates, setCoordinates] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event) => setChangeState(event, route, setRoute)

  useEffect(() => {
    if (!coordinates) return
    setRoute({ ...route, coordinates })
  }, [coordinates])

  const send = async () => {
    setIsLoading(true)
    const id = route.id
    try {
      await updateDbDoc('routes', id, { ...route })
      await updateDbDoc('pages', id, { ...page })
      toast.success(`Route: ${route.name} updated`)
    } catch (error) {
      console.log('error:', error)
    } finally {
      setIsLoading(false)
      return
    }
  }

  if (!route || !page) {
    return (
      <p>load</p>
    )
  }

  const main = (
    <Grid container spacing={4}>
      {/* left column */}
      <FormDescription
        object={route}
        onChange={handleChange}
        setImage={(file) => setRoute({ ...route, image: file.url })}
      />
    </Grid>
  )

  const pageBuilder = (
    <PageBuilder
      blocks={page.blocks}
      setBlocks={(blocks) => setPage({ ...page, blocks })}
      storage={route.id}
    />
  )

  return (
    <div>
      <FormHead
        object={route}
        collection={collection}
        isLoading={isLoading}
        onChange={handleChange}
        onSend={send}
      />

      <Tabs content={[
        { title: 'Основное', content: main },
        { title: 'Конструктор страницы', content: pageBuilder },
      ]}/>
    </div>
  )
}

PlaceForm.defaultProps = {
  propObject: {
    ...ROUTE,
  },
  propPage: {
    ...PAGE,
  }
}

export default PlaceForm