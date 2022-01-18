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

const PlaceForm = ({ isUpdate, propPlace, propPage }) => {
  console.log('propPage:', propPage)
  console.log('propPlace:', propPlace)
  const router = useRouter()
  const [place, setPlace] = useState(propPlace)
  const [page, setPage] = useState(propPage)
  const [coordinates, setCoordinates] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const setBlocks = (blocks) => {
    setPage({ ...page, blocks })
  }

  const handleChange = (event) => setChangeState(event, place, setPlace)

  useEffect(() => {
    if (!coordinates) return
    setPlace({ ...place, coordinates })
  }, [coordinates])

  const send = async () => {
    setIsLoading(true)

    if (isUpdate) {
      const id = place.id
      const newPlace = { ...place }
      delete newPlace.id

      const newPage = { ...page }
      delete newPage.id

      try {
        updateDbDoc('places', id, newPlace).then(() => toast.success(`Place: ${place.name} updated`))
        updateDbDoc('pages', id, newPage).then(() => toast.success(`Place: ${place.name} updated`))
      } catch (error) {
        console.log('error:', error)
      } finally {
        setIsLoading(false)
      }
      return
    }

    addDbDoc('places', place).then((docId) => {
      toast.success('Place created')
      setDbDoc('pages', docId, PAGE).then((docId) => {
        console.log('page created:', docId)
      })
      router.push('/places')
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const deleteDoc = () => {
    setIsLoading(true)
    deleteDbDoc('places', place.id).then((docId) => {
      toast.warn(`Place: ${place.name} deleted`)
      router.push('/places')
    }).finally(() => {
      setIsLoading(false)
    })
  }

  console.log('place:', place)
  console.log('page:', page)
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

  return (
    <div>
      <PlaceFormHead
        place={place}
        isLoading={isLoading}
        isUpdate={isUpdate}
        onChange={handleChange}
        onDelete={deleteDoc}
        onSend={send}
      />

      <Tabs
        content={
          [
            {
              title: 'Основное',
              content: main,
            },
            {
              title: 'Конструктор страницы',
              content: (<PageBuilder blocks={page.blocks} setBlocks={setBlocks} />),
            },
          ]
        }
      />
    </div>
  )
}

PlaceForm.defaultProps = {
  isUpdate: false,
  propPlace: {
    ...PLACE,
  },
  propPage: {
    ...PAGE,
  }
}

export default PlaceForm