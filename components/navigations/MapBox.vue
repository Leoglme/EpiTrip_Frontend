<template>
  <div
    class="mapContainer"
    id="mapContainer"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import mapboxgl, { Map, Marker } from 'mapbox-gl'
import axios from 'axios'

const map = ref<Map | null>(null)
const accessToken =
  'pk.eyJ1IjoiZmxvcmlhbnJvdXNzZWF1IiwiYSI6ImNsdHg0bGpjYzAzNnEyaXMxcDlvbnNzZHQifQ.N9vFw7kJyrfJuFgHF3tp0Q'
const start: [number, number] = [-74.006, 40.7128] // New York
const end: [number, number] = [-71.0589, 42.3601] // Boston

const mapStyle = 'mapbox://styles/mapbox/streets-v12'

const initializeMap = () => {
  if (!map.value) {
    mapboxgl.accessToken = accessToken
    map.value = new Map({
      container: 'mapContainer',
      style: mapStyle,
      center: [start[0], start[1]],
      zoom: 10,
    })

    map.value.on('load', addRoute)
  }
}

const addRoute = () => {
  const directionsRequest = `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${start.join(',')};${end.join(',')}?geometries=geojson&overview=full&access_token=${accessToken}`

  axios
    .get(directionsRequest)
    .then((response) => {
      const route = response.data.routes[0].geometry

      map.value!.addSource('route', {
        type: 'geojson',
        data: route,
      })

      map.value!.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#ff0',
          'line-width': 5,
        },
      })

      new Marker().setLngLat([-74.006, 40.7128]).addTo(map.value!)
    })
    .catch((error) => console.error('Error calling Mapbox Directions API:', error))
}

onMounted(() => {
  initializeMap()
})
</script>

<style scoped>
.mapContainer {
  width: 100%;
  height: 100vh;
}
</style>
