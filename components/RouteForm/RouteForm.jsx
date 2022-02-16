import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'

import { addDbDoc, deleteDbDoc, updateDbDoc, setDbDoc } from '../../firebase/firebaseFirestore'
import { setChangeState } from '../../utils/setChangeState'
import { ROUTE, PAGE } from '../../models';

import Tabs from '../Tabs/Tabs';
import PageBuilder from '../PageBuilder/PageBuilder'

// import PlaceFormMap from './PlaceFormMap';
// import PlaceFormDescription from './PlaceFormDescription';
import RouteFormHead from './RouteFormHead';
import Grid from '@mui/material/Grid'

const PlaceForm = ({ propRoute, propPage }) => {
  const router = useRouter()
  const [route, setRoute] = useState(propRoute)
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
    <div>main</div>
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
      <RouteFormHead
        route={route}
        isLoading={isLoading}
        onChange={handleChange}
        onDelete={() => router.push('/routes')}
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
  propRoute: {
    ...ROUTE,
  },
  propPage: {
    ...PAGE,
  }
}

export default PlaceForm