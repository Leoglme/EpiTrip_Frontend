<template>
  <div
    id="mapContainer"
    class="mapContainer"
  ></div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import mapboxgl, { LngLatBounds, Map } from 'mapbox-gl'
import axios from 'axios'
import { useRoute } from 'vue-router'
import type { Ref, ComputedRef } from 'vue'
import type * as GeoJSON from 'geojson'
import type { CoordinateTuple } from '~/lib/types/MapboxTypes'
import { useGoogleApiStore } from '#imports'
import type { GooglePlace } from '~/core/types/google-places'
import { useSuggestionStore } from '~/stores/suggestion.store'

/* PROPS */
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
})

/* STORES */
const googleApiStore = useGoogleApiStore()
const suggestionStore = useSuggestionStore()

/* HOOKS */
const route = useRoute()

/* REFS */
const map: Ref<Map | null> = ref(null)
const start: Ref<CoordinateTuple | null> = ref(null)
const end: Ref<CoordinateTuple | null> = ref(null)

/* CONSTANTS */
const mapboxAccessToken: string =
  'pk.eyJ1IjoiZmxvcmlhbnJvdXNzZWF1IiwiYSI6ImNsdHg0bGpjYzAzNnEyaXMxcDlvbnNzZHQifQ.N9vFw7kJyrfJuFgHF3tp0Q'

/* COMPUTED */
const sortedMarkers: ComputedRef<GeoJSON.Feature[]> = computed(() => {
  const categoryOrder: { [key: number]: Array<[keyof typeof googleApiStore, string]> } = {
    1: [
      ['restaurants', 'restaurant'],
      ['bars', 'bar'],
      ['hotels', 'lodging'],
      ['events', 'theatre'],
    ],
    2: [
      ['bars', 'bar'],
      ['restaurants', 'restaurant'],
      ['hotels', 'lodging'],
      ['events', 'theatre'],
    ],
    3: [
      ['hotels', 'lodging'],
      ['restaurants', 'restaurant'],
      ['bars', 'bar'],
      ['events', 'theatre'],
    ],
    4: [
      ['events', 'theatre'],
      ['restaurants', 'restaurant'],
      ['bars', 'bar'],
      ['hotels', 'lodging'],
    ],
  }

  // Get the current order based on the active tab or default to the first tab order
  const currentOrder = categoryOrder[suggestionStore.activeTabId] || categoryOrder[1]

  // Flatten and generate place markers based on the current order
  return currentOrder.flatMap(([storeKey, icon]) =>
    generatePlaceMarkers(googleApiStore[storeKey] as GooglePlace[], icon),
  )
})

/* METHODS */
const parseCoordinates = (coordinates: string | undefined): CoordinateTuple | null => {
  if (!coordinates) return null
  const [latitude, longitude] = coordinates.split(',').map(Number)
  return isNaN(latitude) || isNaN(longitude) ? null : [longitude, latitude]
}

const initializeMap = () => {
  if (map.value || !start.value || !end.value) return
  mapboxgl.accessToken = mapboxAccessToken
  map.value = new Map({
    container: 'mapContainer',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: start.value,
    zoom: 10,
  })

  map.value.on('load', async () => {
    try {
      await loadRoute()
      loadStartEndMarkers()
      loadPlacesMarkers()
      map.value?.resize()
      // Remove POI in the map
      map.value?.removeLayer('poi-label')
    } catch (error) {
      console.error('Error initializing map:', error)
    }
  })
}

const loadRoute = async () => {
  if (!start.value || !end.value) return
  const directionsRequest = `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${start.value.join(',')};${end.value.join(',')}?geometries=geojson&overview=full&access_token=${mapboxAccessToken}`
  const response = await axios.get(directionsRequest)
  const routeData = response.data.routes[0].geometry

  map.value?.addLayer({
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
      'line-color': '#0077B6',
      'line-width': 5,
      'line-opacity': 0.75,
    },
  })

  const bounds = new LngLatBounds()
  bounds.extend(start.value)
  bounds.extend(end.value)
  map.value?.fitBounds(bounds, {
    padding: { top: 50, bottom: 50, left: 50, right: 50 },
  })
}

// https://docs.mapbox.com/ios/search/api/core/1.0.0-beta.1/Enums/Maki.html#/s:12MapboxSearch4MakiO7lodgingyA2CmF
const loadPlacesMarkers = () => {
  const features: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
    type: 'FeatureCollection',
    features: sortedMarkers.value,
  }

  if (map.value) {
    if (map.value.getSource('places')) {
      map.value.removeLayer('places')
      map.value.removeSource('places')
    }

    map.value.addSource('places', {
      type: 'geojson',
      data: features,
    })

    map.value.addLayer({
      id: 'places',
      type: 'symbol',
      source: 'places',
      layout: {
        'icon-image': ['get', 'icon'],
        'icon-size': 1.5,
      },
    })
  }
}

const loadStartEndMarkers = () => {
  const features: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
    type: 'FeatureCollection',
    features: generateStartEndMarkers(),
  }

  map.value?.addSource('markers', {
    type: 'geojson',
    data: features,
  })

  const hasMarkerStartEndImage: boolean = map.value?.hasImage('custom-marker') || false

  if (hasMarkerStartEndImage) {
    map.value?.addLayer({
      id: 'markers',
      type: 'symbol',
      source: 'markers',
      layout: {
        'icon-image': 'custom-marker',
        'icon-size': 0.8,
      },
    })
  } else {
    map.value?.loadImage(
      '/images/custom_marker.png',
      function (error: Error | undefined, image: HTMLImageElement | ImageBitmap | undefined) {
        if (error) throw error
        if (!image) return
        map.value?.addImage('custom-marker', image)
        map.value?.addLayer({
          id: 'markers',
          type: 'symbol',
          source: 'markers',
          layout: {
            'icon-image': 'custom-marker',
            'icon-size': 0.8,
            'text-field': '{title}',
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 0.6],
            'text-anchor': 'top',
          },
        })
      },
    )
  }
}

const generateStartEndMarkers = (): GeoJSON.Feature[] => {
  if (!start.value || !end.value) return []
  return [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: start.value,
      },
      properties: {
        'marker-symbol': 'harbor',
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
  ]
}

const generatePlaceMarkers = (data: GooglePlace[], icon: string): GeoJSON.Feature[] => {
  console.log('generatePlaceMarkers', data, icon)
  return data.map((item) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [item.location.longitude, item.location.latitude],
    },
    properties: {
      icon,
    },
  }))
}

// RUN MAP
start.value = parseCoordinates(route.query.start as string)
end.value = parseCoordinates(route.query.end as string)

const resetMarkers = () => {
  // verify has layer and source
  if (map.value?.getLayer('markers') && map.value?.getSource('markers')) {
    map.value?.removeLayer('markers')
  }
  loadPlacesMarkers()

  map.value?.addLayer({
    id: 'markers',
    type: 'symbol',
    source: 'markers',
    layout: {
      'icon-image': 'custom-marker',
      'icon-size': 0.8,
    },
  })
}

/* LIFECYCLE */
onMounted(() => {
  if (!props.isLoading && start.value && end.value) {
    initializeMap()
    nextTick(() => {
      map.value?.resize()
    })
  }
})

/* WATCHERS */
watch(
  () => props.isLoading,
  (isLoading) => {
    if (!isLoading && start.value && end.value) {
      initializeMap()
      nextTick(() => {
        map.value?.resize()
      })
    }
  },
)

watch(
  () => suggestionStore.selectedCoordinates,
  (newCoordinates) => {
    if (newCoordinates && map.value) {
      map.value.flyTo({
        center: [newCoordinates.longitude, newCoordinates.latitude],
        essential: true,
        zoom: 17,
      })
    }
  },
  { immediate: true },
)

watch(
  () => suggestionStore.activeTabId,
  (activeTabId: number) => {
    // verify if activeTabId is in [1, 2, 3, 4]
    if (activeTabId >= 1 && activeTabId <= 4) {
      resetMarkers()
    }
  },
)

watch(
  () => suggestionStore.isRefreshing,
  (isRefreshing) => {
    if (!isRefreshing) {
      console.log('REFRESH END - LOAD PLACES MARKERS')
      resetMarkers()
    }
  },
)
</script>

<style>
.mapContainer {
  width: 100%;
  height: 100%;
  cursor: grab;
}

.mapboxgl-ctrl,
.mapboxgl-ctrl-attrib {
  display: none;
}
</style>
