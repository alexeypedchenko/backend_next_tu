import React, { useEffect, useState } from 'react'
import { GoogleMap } from '../../googleMap/googleMap'
import styles from './Map.module.css'

const Map = ({ markers, setCoordinates }) => {
  const [map, setMap] = useState(null)

  useEffect(() => {
    const gmap = new GoogleMap('#map', {
      onDragend: (coords) => setCoordinates(coords)
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

export default Map
