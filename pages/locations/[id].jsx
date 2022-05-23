import React from 'react'
import { useRouter } from 'next/router'
import FormEdit from '../../components/FormBlocks/FormEdit'
import LocationForm from '../../components/LocationForm/LocationForm'

const Index = () => {
  const collection = 'locations'
  const router = useRouter()
  const { id } = router.query

  return (
    <FormEdit id={id} collection={collection} Form={LocationForm} />
  )
}

export default Index
