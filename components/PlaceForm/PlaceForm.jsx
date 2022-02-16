import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'

import { addDbDoc, deleteDbDoc, updateDbDoc, setDbDoc } from '../../firebase/firebaseFirestore'
import { setChangeState } from '../../utils/setChangeState'
import { PLACE, PAGE } from '../../models';

import Tabs from '../Tabs/Tabs';
import PageBuilder from '../PageBuilder/PageBuilder'

import Grid from '@mui/material/Grid'
import PlaceFormMap from './PlaceFormMap';
import PlaceFormDescription from './PlaceFormDescription';
import PlaceFormHead from './PlaceFormHead';

const PlaceForm = ({ propPlace, propPage }) => {
  const router = useRouter()
  const [place, setPlace] = useState(propPlace)
  const [page, setPage] = useState(propPage)
  const [coordinates, setCoordinates] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event) => setChangeState(event, place, setPlace)

  useEffect(() => {
    if (!coordinates) return
    setPlace({ ...place, coordinates })
  }, [coordinates])

  const send = async () => {
    setIsLoading(true)
    const id = place.id
    try {
      await updateDbDoc('places', id, { ...place })
      await updateDbDoc('pages', id, { ...page })
      toast.success(`Place: ${place.name} updated`)
    } catch (error) {
      console.log('error:', error)
    } finally {
      setIsLoading(false)
      return
    }
  }

  if (!place || !page) {
    return (
      <p>load</p>
    )
  }

  const main = (
    <Grid container spacing={4}>
      {/* left column */}
      <PlaceFormDescription
        place={place}
        onChange={handleChange}
        setImage={(file) => setPlace({ ...place, image: file.url })}
      />
      {/* right column */}
      <PlaceFormMap
        place={place}
        onChange={handleChange}
        setCoordinates={setCoordinates}
      />
    </Grid>
  )

  const pageBuilder = (
    <PageBuilder
      blocks={page.blocks}
      setBlocks={(blocks) => setPage({ ...page, blocks })}
      storage={place.id}
    />
  )

  return (
    <div>
      <PlaceFormHead
        place={place}
        isLoading={isLoading}
        onChange={handleChange}
        onDelete={() => router.push('/places')}
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
  propPlace: {
    ...PLACE,
  },
  propPage: {
    ...PAGE,
  }
}

export default PlaceForm