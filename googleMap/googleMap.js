import { Loader } from '@googlemaps/js-api-loader'
import MarkerClusterer from '@googlemaps/markerclustererplus'

export class GoogleMap {
  constructor(selector, {
    draggable = true,
    onDragend = null,
  }) {
    this.loader = new Loader({
      apiKey: 'AIzaSyBOMQAKjVaaYfe_fSHNn3CBFcbNS651GnA',
      version: 'weekly',
    })

    // map
    this.map = null
    this.mapContainer = document.querySelector(selector)

    this.mapOptions = {
      zoom: 6,
      center: {
        lat: 49.30881846,
        lng: 30.53801849,
      },
      clickableIcons: false, // клик на объекты карты и видеть информацию о них
      // disableDefaultUI: true, // выключить все элементы элементы управления картой
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
      scrollwheel: true, // возможность масштабировать карту мышкой или тачпадом
    }

    // markers
    this.markers = []
    this.circle = null

    // cluster
    this.markerCluster = null
    this.bounds = null

    this.directionsService = null
    this.directionsRenderer = null

    this.coordinates = null

    this.draggable = draggable
    console.log('this.draggable:', this.draggable)
    this.onDragend = onDragend
  }

  initDirections() {
    https://developers.google.com/maps/documentation/javascript/reference/directions
    this.directionsService = new google.maps.DirectionsService()
    // https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsRendererOptions
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true, // Подавить рендеринг маркеров.
      // https://developers.google.com/maps/documentation/javascript/reference/polygon#PolylineOptions
      // polylineOptions: {
      // strokeColor: 'blue',
      // zIndex: 1,
      // }
    })
  }

  setWaypointsToDirections(waypts) {
    console.log('waypts:', waypts)
    if (!waypts.length) return
    this.directionsRenderer.setMap(this.map)
    // для отрисовки маршрута, точек на карте должно быть больше 2 и более
    if (waypts.langth < 2) return

    waypts = waypts.map((waypt) => {
      return this.createWaypoint(waypt)
    })

    const request = {
      origin: waypts[0].location, // определяем стартовую точку
      destination: waypts[waypts.length - 1].location, // определяем конечную точку
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    }

    // определяем промежуточные точки
    if (waypts.length > 2) {
      request.waypoints = waypts.splice(1, waypts.length - 2)
    }

    this.directionsService.route(request, (response, status) => {
      if (status === "OK" && response) {
        this.directionsRenderer.setDirections(response)
      } else {
        window.alert("Directions request failed due to " + status);
      }
    })
  }

  createWaypoint(marker) {
    const lat = marker.coordinates ? Number.parseInt(marker.coordinates.lat) : marker.getPosition().lat()
    const lng = marker.coordinates ? Number.parseInt(marker.coordinates.lng) : marker.getPosition().lng()
    // https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsWaypoint
    return {
      location: new google.maps.LatLng(lat, lng),
      stopover: false,
    }
  }

  setMarkers(markers = []) {
    // очищаем маркеры
    this.clearMarkers()

    // переменная для определения границ маркеров
    this.bounds = new google.maps.LatLngBounds()

    markers.forEach((item) => {
      // создаем маркер
      const marker = this.createMarker(item)
      if (!marker) return
      // добавляем маркер в массив
      this.markers.push(marker)
      // добавляем новую позицию маркера для центрирования карты
      this.bounds.extend({
        lat: +item.coordinates.lat,
        lng: +item.coordinates.lng,
      })
      // создаем модальное окно маркера
      this.createInfoWindow(marker, item)

      // Добавляем события наведении мишки
      this.markerOnMouseover(marker, item)
      this.markerOnMouseout(marker, item)

      this.markerOnDrag(marker, item)
      this.markerOnDragend(marker, item)
    })

    // группируем маркеры
    this.markerCluster = new MarkerClusterer(this.map, this.markers, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    })

    this.centeredMap()
    if (this.markers.length > 1) {
      this.setWaypointsToDirections(this.markers)
    }
  }

  createMarker(marker, onMap = false) {
    if (!marker) return
    const options = {
      draggable: this.draggable,
      position: {
        lat: +marker.coordinates.lat,
        lng: +marker.coordinates.lng,
      },
      zIndex: 10,
      // https://developers.google.com/maps/documentation/javascript/reference/marker#Icon
      // icon: {
      //   url: marker.icon,
      //   size: new google.maps.Size(30, 30),
      //   // если изображение меньше или больше 30px, масштабируем до 30
      //   scaledSize: new google.maps.Size(30, 30),
      // },
    }
    if (onMap) {
      options.map = this.map
    }
    return new google.maps.Marker(options)
  }

  handleCreateMarker(data) {
    const marker = this.createMarker(data, true)
    this.markers.push(marker)
    this.showCircle(marker)
  }

  removeMarker(index) {
    this.markers[index].setMap(null)
  }

  removeLastMarker() {
    this.markers[this.markers.length - 1].setMap(null)
    this.hideCircle()
  }

  centeredMap() {
    // центрируем карту относительно всех маркеров
    if (this.markers.length > 1) {
      this.map.fitBounds(this.bounds)
      this.rebotMapZoom()
      // Центрируем карту относительно одного маркера
    } else if (this.markers.length === 1) {
      this.map.setCenter(this.markers[0].getPosition())
      // this.map.setZoom(10)
      // если маркеров нет, сбрасываем центр в исходную позицию
    } else {
      this.map.setCenter(this.mapOptions.center)
      this.map.setZoom(this.mapOptions.zoom)
    }
  }

  rebotMapZoom() {
    // после обновление маркеров с 0 до n, они группируються в одном класстере
    // сбрасываем зюм для предотарвщения группировки
    const mapZoom = this.map.getZoom()
    this.map.setZoom(mapZoom - 1)
    setTimeout(() => {
      this.map.setZoom(mapZoom)
    }, 0)
  }

  createInfoWindow(marker, markerData) {
    // добавляем модальное окно
    const modalTemplate = this.getInfoWindowTemplate(markerData) // шаблон модального окна карты в строковом формате
    const infoWindow = new google.maps.InfoWindow({
      content: modalTemplate
    })

    this.openInfoWindowOnMarkerClick(marker, infoWindow)

    // при клике на карту закрываем все модальные окна
    this.map.addListener('click', () => {
      infoWindow.close(this.map, marker)
    })
  }

  openInfoWindowOnMarkerClick(marker, infoWindow) {
    // при клике на маркер связываем модальное окно и маркер, далее открываем модалку
    marker.addListener('click', () => {
      if (infoWindow.getMap()) {
        infoWindow.close(this.map, marker)
      } else {
        // имитация клика по карте для закрытия всех infoWindow
        google.maps.event.trigger(this.map, 'click')

        // открываем нужный infoWindow
        infoWindow.open(this.map, marker)

        // Центрируем карту относительно нужного маркера
        this.map.setCenter(marker.getPosition())
      }
    })
  }

  markerOnMouseover(marker, item) {
    marker.addListener('mouseover', () => {
      this.showCircle(marker)
    })
  }
  markerOnMouseout(marker) {
    marker.addListener('mouseout', () => {
      this.hideCircle()
    })
  }
  markerOnDrag(marker) {
    marker.addListener('drag', () => {
      this.hideCircle()
    })
  }
  markerOnDragend(marker) {
    marker.addListener('dragend', () => {
      this.coordinates = {
        lat: (marker.getPosition().lat()).toFixed(4),
        lng: (marker.getPosition().lng()).toFixed(4),
      }
      if (this.onDragend && typeof this.onDragend === 'function') {
        this.onDragend(this.coordinates)
      }
      this.centeredMap()
    })
  }

  clearMarkers() {
    if (this.directionsRenderer) {
      this.directionsRenderer.setMap(null);
    }
    this.clearCluster()

    this.markers.forEach((marker, index) => {
      this.removeMarker(index)
    })

    this.markers = []
  }

  clearCluster() {
    if (this.markerCluster !== null) {
      this.bounds = null
      this.markerCluster.clearMarkers()
    }
  }

  getInfoWindowTemplate(marker) {
    return `
      <div class="map-window">
        <div class="map-window-img">
          <img src="${marker.image}" alt="${marker.name}">
        </div>
        <div class="map-window-content">
          <div class="map-window-text">
            <h2 class="map-window-title h5">
              ${marker.name}
            </h2>
            <p class="map-window-description p2">
              <span>
                ${marker.description}
              <span/>
            </p>
          </div>
        </div>
      </div>
    `
  }

  createCircle() {
    this.circle = new google.maps.Marker({
      zIndex: 2,
      visible: false,
      position: {
        lat: 46.64288927,
        lng: 31.07230514,
      },
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'green',
        fillOpacity: 0.15,
        strokeColor: 'green',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        scale: 20,
        anchor: new google.maps.Point(0, 0.8),
        zIndex: 2
      },
      map: this.map
    })
  }

  showCircle(marker) {
    const position = marker.getPosition()
    this.circle.setPosition(position)
    this.circle.setVisible(true)
  }

  hideCircle() {
    this.circle.setVisible(false)
  }

  init() {
    return new Promise((resolve, reject) => {
      this.loader
        .load()
        .then(() => {
          this.map = new google.maps.Map(this.mapContainer, this.mapOptions)
          this.initDirections()
          this.createCircle()
          return resolve()
        })
        .catch((error) => {
          console.log('GoogleMap init error:', error)
          return reject()
        })
    })
  }
}