<template>
  <div
    id="mapContainer"
    class="mapContainer"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import mapboxgl, { LngLatBounds, Map } from 'mapbox-gl'
import axios from 'axios'
import { useRoute } from 'vue-router'
import type { Ref } from 'vue'
import type { CoordinateTuple } from '~/lib/types/MapboxTypes'

const route = useRoute()
const map: Ref<Map | null> = ref(null)
const accessToken =
  'pk.eyJ1IjoiZmxvcmlhbnJvdXNzZWF1IiwiYSI6ImNsdHg0bGpjYzAzNnEyaXMxcDlvbnNzZHQifQ.N9vFw7kJyrfJuFgHF3tp0Q'
const start: Ref<CoordinateTuple | null> = ref(null)
const waypoints: Ref<CoordinateTuple[] | null> = ref(null)
const end: Ref<CoordinateTuple | null> = ref(null)
const mapStyle = 'mapbox://styles/mapbox/streets-v12'

const parseCoordinates = (coordinates: string | undefined): CoordinateTuple | null => {
  if (!coordinates) return null
  const [latitude, longitude] = coordinates.split(',').map(parseFloat)
  return isNaN(latitude) || isNaN(longitude) ? null : [longitude, latitude]
}

const initializeMap = () => {
  if (map.value || !start.value || !end.value) return
  mapboxgl.accessToken = accessToken
  map.value = new Map({
    container: 'mapContainer',
    style: mapStyle,
    center: start.value,
    zoom: 10,
  })

  map.value.on('load', () => {
    if (!map.value || !start.value || !end.value || !waypoints.value) return
    const waypointCoordinates = waypoints.value.map((waypoint) => waypoint.join(',')).join(';')

    const directionsRequest = `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${start.value.join(',')};${waypointCoordinates};${end.value.join(',')}?geometries=geojson&overview=full&access_token=${accessToken}`

    axios
      .get(directionsRequest)
      .then((response) => {
        const routeData = response.data.routes[0].geometry

        map.value!.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: routeData,
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75,
          },
        })

        const bounds = new LngLatBounds()
        addMarkers(map.value, bounds)
      })
      .catch((error) => {
        console.error('Error calling Mapbox Directions API:', error)
      })
  })
}

const restaurants = [
  { name: 'Le Petit Bistro', coordinates: [2.3522, 48.8566] }, // Paris
  { name: 'La Brasserie du Port', coordinates: [-1.5536, 47.2184] }, // Bordeaux
  { name: 'La Table Provençale', coordinates: [5.3698, 43.2965] }, // Marseille
]

const hotels = [
  { name: 'Hôtel de la Cité', coordinates: [2.3508, 43.2932] }, // Carcassonne
  { name: 'Grand Hôtel du Palais Royal', coordinates: [2.3375, 48.8634] }, // Paris
  { name: 'Hôtel du Palais', coordinates: [-1.5528, 47.3954] }, // Biarritz
]

const events = [
  { name: 'Festival de Cannes', coordinates: [7.0174, 43.5528] },
  { name: 'Fête de la Musique', coordinates: [3.0605, 50.6366] }, // Lille
  { name: "Festival d'Avignon", coordinates: [4.8055, 43.9493] },
]

const generateMarkers = (data: any[], type: string) => {
  return data.map((item) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: item.coordinates,
    },
    properties: {
      'marker-symbol': type,
      title: item.name,
      type,
    },
  }))
}

const restaurantMarkers = generateMarkers(restaurants, 'restaurant')
const hotelMarkers = generateMarkers(hotels, 'hotel')
const eventMarkers = generateMarkers(events, 'event')

const allMarkers = restaurantMarkers.concat(hotelMarkers, eventMarkers)

const addMarkers = (map: any, bounds: any) => {
  const features = [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: start.value,
      },
      properties: {
        'marker-symbol': 'monument',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: end.value,
      },
      properties: {
        'marker-symbol': 'harbor',
      },
    },
    ...(waypoints.value || []).map((waypoint, index) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: waypoint,
      },
      properties: {
        'marker-symbol': `waypoint-${index + 1}`,
      },
    })),
    ...allMarkers,
  ]

  map.addSource('markers', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features,
    },
  })

  map.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png', function (error: any, image: any) {
    if (error) throw error
    map.addImage('custom-marker', image)
    map.addLayer({
      id: 'markers',
      type: 'symbol',
      source: 'markers',
      layout: {
        'icon-image': 'custom-marker',
        'text-field': '{title}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.6],
        'text-anchor': 'top',
      },
    })
  })

  bounds.extend(start.value)
  bounds.extend(end.value)

  map.fitBounds(bounds, {
    padding: { top: 50, bottom: 50, left: 50, right: 50 },
  })
}

onMounted(() => {
  start.value = parseCoordinates(route.query.start as string)
  end.value = parseCoordinates(route.query.end as string)
  waypoints.value = [
    [-0.35, 49.18333],
    [0.1077, 49.4938],
    [2.3, 49.9],
  ]

  if (start.value && end.value && waypoints.value) {
    initializeMap()
  } else {
    console.error('Invalid start or end coordinates')
  }
})
</script>

<style scoped>
.mapContainer {
  width: 100%;
  height: 100vh;
}
</style>
