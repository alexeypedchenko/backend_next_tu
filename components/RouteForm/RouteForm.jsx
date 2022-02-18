import React, { useState, useMemo, useContext } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { toast } from 'react-toastify';

import { updateDbDoc } from '../../firebase/firebaseFirestore'
import { setChangeState } from '../../utils/setChangeState'
import { ROUTE, PAGE } from '../../models';

import Tabs from '../Tabs/Tabs';
import PageBuilder from '../PageBuilder/PageBuilder'
import FormDescription from '../FormBlocks/FormDescription';
import FormHead from '../FormBlocks/FormHead';
import RouteConstructor from './RouteConstructor'

import Grid from '@mui/material/Grid'

import { Context } from '../Layout/DefaultLayout'

const PlaceForm = ({ propObject, propPage }) => {
  const collection = 'routes'
  const [route, setRoute] = useState(propObject)
  const [page, setPage] = useState(propPage)
  const [isLoading, setIsLoading] = useState(false)
  const { places } = useContext(Context)

  const localRoute = useMemo(() => {
    return route.places.map((place, idx) => {
      const index = places.findIndex((pl) => pl.id === place)
      return {
        ...places[index],
        index: idx,
      }
    })
  }, [route.places])

  const handleChange = (event) => setChangeState(event, route, setRoute)

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

  const routeConstructor = <RouteConstructor
    onChange={handleChange}
    routePlaces={route.places}
    places={places}
    route={localRoute}
  />

  const pageBuilder = (
    <DndProvider backend={HTML5Backend}>
      <PageBuilder
        blocks={page.blocks}
        setBlocks={(blocks) => setPage({ ...page, blocks })}
        storage={route.id}
      />
    </DndProvider>
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
        { title: 'Маршрут', content: routeConstructor },
        { title: 'Конструктор страницы', content: pageBuilder },
      ]} />
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