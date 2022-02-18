import React, { useRef, useState } from 'react'
import Dialog from '../Dialog/Dialog'
import Map from '../Map/Map'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

const ConstructorBlock = ({ place, id, index, moveItems, onRemove }) => {
  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: 'routeBlock',
    collect(monitor) {
      return { handlerId: monitor.getHandlerId() }
    },
    hover(item, monitor) {
      if (!ref.current) return
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) return
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return
      moveItems(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'routeBlock',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  drag(drop(ref))

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      key={place.id}
      style={{
        border: '1px solid #000',
        padding: 10,
        marginBottom: 10,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        flexDirection: 'column',
        opacity: isDragging ? 0.05 : 1,
      }}
    >
      <h3 style={{ margin: 0 }}>
        {place.name}
      </h3>
      <img width={100} src={place.image} />
      <Dialog
        btnText="Удалить"
        title="Удалить локацию из маршрута?"
        color="error"
        ok={onRemove}
      />
    </div>
  )
}

const RouteConstructor = ({ routePlaces, places, route, onChange }) => {
  const [showMap, setShowMap] = useState(false)

  const handleChange = (arr) => onChange({ target: { name: 'places', value: arr } })

  const moveItems = (dragIndex, hoverIndex) => {
    const arr = [...routePlaces]
    arr.splice(dragIndex, 0, arr.splice(hoverIndex, 1)[0])
    handleChange(arr)
  }

  const addPlaceToRoute = (placeId) => {
    if (routePlaces.includes(placeId)) return
    const arr = [...routePlaces, placeId]
    handleChange(arr)
  }

  const removePlaceFromRoute = (placeId) => {
    const arr = [...routePlaces.filter((id) => id !== placeId)]
    handleChange(arr)
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0 }}>Создание маршрута</h2>
        {route.length > 0 && (
          <Button variant="contained" color="secondary" onClick={() => setShowMap(!showMap)}>
            {showMap ? 'Скрыть' : 'Показать'} карту
          </Button>
        )}
      </Grid>

      {showMap && (<Grid item xs={12}><Map markers={route} draggable={false} /></Grid>)}

      <Grid item xs={12} sm={6}>
        <h3 style={{ marginTop: 0 }}>Все локации: </h3>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          padding: 10,
          background: '#fff',
          overflowY: 'auto',
          maxHeight: 400,
        }}>
          {places.map((place) => (
            <div
              key={place.id}
              style={{
                border: '1px solid #000',
                padding: 10,
                margin: '0 3.3% 10px 0',
                width: '30%',
                minWidth: 150,
              }}
              onClick={() => addPlaceToRoute(place.id)}
            >
              <h3 style={{ margin: '0 0 10px 0' }}>
                {place.name}
              </h3>
              <img width={100} src={place.image} />
            </div>
          ))}
        </div>
      </Grid>

      <Grid item xs={12} sm={6}>
        <h3 style={{ marginTop: 0 }}>Ваш маршрут: </h3>
        <div style={{
          padding: 10,
          background: '#fff',
        }}>
          <DndProvider backend={HTML5Backend}>
            {route.map((place, index) => (
              <ConstructorBlock
                place={place}
                index={index}
                key={place.id}
                id={place.id}
                moveItems={moveItems}
                onRemove={() => removePlaceFromRoute(place.id)}
              />
            ))}
          </DndProvider>
        </div>
      </Grid>
    </Grid>
  )
}

export default RouteConstructor