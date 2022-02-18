import React, { useEffect, useState, memo } from 'react'
import { GoogleMap } from '../../googleMap/googleMap'
import styles from './Map.module.css'

const Map = ({ markers, setCoordinates, draggable }) => {
  console.log('markers:', markers)
  const [map, setMap] = useState(null)

  useEffect(() => {
    const gmap = new GoogleMap('#map', {
      draggable,
      onDragend: (coords) => {
        setCoordinates(coords)
      }
    })
    gmap.init().then(() => setMap(gmap))
  }, [])

  useEffect(() => {
    if (map) {
      map.setMarkers(markers)
    }
  }, [map, markers])

  return (
    <div style={{width: '100%'}}>
      <div className={styles.map} id="map">
      </div>
    </div>
  )
}

Map.defaultProps = {
  draggable: true,
  markers: [{ coordinates: { lat: 46.48, lng: 30.72 } }],
  setCoordinates: (coords) => console.log(coords),
}

const areEqual = (prevProps, nextProps) => {
  const prevCoords = prevProps.markers[0].coordinates
  const nextCoords = nextProps.markers[0].coordinates

  const prevMarkersId = JSON.stringify(prevProps.markers.map((marker) => marker.id))
  const nextMarkersId = JSON.stringify(nextProps.markers.map((marker) => marker.id))

  const reuslt = prevCoords === nextCoords
    && prevMarkersId === nextMarkersId
  return reuslt
}

export default memo(Map, areEqual)
