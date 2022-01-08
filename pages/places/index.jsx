import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getDbDocs, getDbDocsByOrder, deleteDbDoc } from '../../firebase/firebaseFirestore'
import Button from '@mui/material/Button'
import Link from 'next/link'

const Index = () => {
  const router = useRouter()
  const [places, setPlaces] = useState([])

  useEffect(() => {
    // getDbDocs('places')
    getDbDocsByOrder('places', 'createdAt').then((docs) => {
      setPlaces(docs)
    })
  }, [])

  const deleteDoc = (id) => {
    deleteDbDoc('places', id).then((docId) => {
      setPlaces(places.filter((place) => place.id !== docId))
    })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Places</h1>
        <Button variant="contained" onClick={() => router.push('/places/create')}>
          Создать новое место
        </Button>
      </div>
      <div style={{
        padding: '10px 10px 0 10px',
        border: 'dotted 2px #ccc',
        marginTop: 20,
      }}>
        {places.map((place) => (
          <div key={place.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
            padding: 10,
            background: '#ccc',
          }}>
            <Link href={`/places/${place.id}`}>
              <a>
                {place.name} - {place.id}
              </a>
            </Link>
            <span>
              <Button
                style={{marginRight: 10}}
                variant="contained"
                size="small"
                color="info"
                onClick={() => router.push(`/places/${place.id}`)}
              >
                Изменить
              </Button>
              <Button
                variant="contained"
                size="small"
                color="error"
                onClick={() => deleteDoc(place.id)}
              >
                Удалить
              </Button>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Index
