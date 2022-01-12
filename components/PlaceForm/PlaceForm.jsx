import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'

import { addDbDoc, deleteDbDoc, updateDbDoc } from '../../firebase/firebaseFirestore'
import { setChangeState } from '../../utils/setChangeState'
import { PLACE } from '../../models/Place';

import Grid from '@mui/material/Grid'
import PlaceFormMap from './PlaceFormMap';
import PlaceFormDescription from './PlaceFormDescription';
import PlaceFormHead from './PlaceFormHead';

const PlaceForm = ({ isUpdate, propPlace }) => {
  const router = useRouter()
  const [place, setPlace] = useState(propPlace)
  const [coordinates, setCoordinates] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

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
      updateDbDoc('places', id, newPlace).then(() => {
        toast.success(`Place: ${place.name} updated`)
      }).finally(() => {
        setIsLoading(false)
      })
      return
    }

    addDbDoc('places', place).then((docId) => {
      toast.success('Place created')
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

  if (!place) {
    return (
      <p>load</p>
    )
  }

  return (
    <Grid container spacing={4}>
      {/* head */}
      <PlaceFormHead
        place={place}
        isLoading={isLoading}
        isUpdate={isUpdate}
        onChange={handleChange}
        onDelete={deleteDoc}
        onSend={send}
      />

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
}

PlaceForm.defaultProps = {
  isUpdate: false,
  propPlace: {
    ...PLACE,
  }
}

export default PlaceForm