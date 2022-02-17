import React from 'react'
import { useRouter } from 'next/router'
import FormEdit from '../../components/FormBlocks/FormEdit'
import RouteForm from '../../components/RouteForm/RouteForm'

const Index = () => {
  const collection = 'routes'
  const router = useRouter()
  const { id } = router.query

  return (
    <FormEdit id={id} collection={collection} Form={RouteForm} />
  )
}

export default Index
