import React from 'react'
import { useRouter } from 'next/router'
import FormEdit from '../../components/FormBlocks/FormEdit'
import PlaceForm from '../../components/PlaceForm/PlaceForm'

const Index = () => {
  const collection = 'places'
  const router = useRouter()
  const { id } = router.query

  return (
    <FormEdit id={id} collection={collection} Form={PlaceForm} />
  )
}

export default Index
