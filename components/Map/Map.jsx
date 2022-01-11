import React, { useEffect, useState, memo } from 'react'
import { GoogleMap } from '../../googleMap/googleMap'
import styles from './Map.module.css'

const Map = ({ markers, setCoordinates }) => {
  const [map, setMap] = useState(null)

  useEffect(() => {
    const gmap = new GoogleMap('#map', {
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
    <div>
      <div className={styles.map} id="map">
      </div>
    </div>
  )
}

Map.defaultProps = {
  markers: [{ coordinates: { lat: 46.48, lng: 30.72 } }],
  setCoordinates: (coords) => console.log(coords),
}

const areEqual = (prevProps, nextProps) => {
  const prevCoords = prevProps.markers[0].coordinates
  const nextCoords = nextProps.markers[0].coordinates
  const reuslt = prevCoords === nextCoords
  return reuslt
}

export default memo(Map, areEqual)
