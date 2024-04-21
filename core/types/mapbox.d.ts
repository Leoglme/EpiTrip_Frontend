interface MapboxFeatureCollection {
  type: 'FeatureCollection'
  query: string[]
  features: MapboxFeature[]
  attribution: string
}

interface MapboxFeature {
  id: string
  type: 'Feature'
  place_type: string[]
  relevance: number
  properties: MapboxProperties
  text: string
  place_name: string
  bbox?: number[]
  center: number[]
  geometry: MapboxGeometry
  context?: MapboxContext[]
}

interface MapboxProperties {
  mapbox_id?: string
  wikidata?: string
  short_code?: string
  landmark?: boolean
  category?: string
  address?: string
  foursquare?: string
  maki?: string
}

interface MapboxGeometry {
  type: 'Point'
  coordinates: number[]
}

interface MapboxContext {
  id: string
  mapbox_id?: string
  wikidata?: string
  short_code?: string
  text: string
}

interface MapboxPlace {
  id: string
  relevance: number
  mapboxId: string | undefined
  text: string
  placeName: string
  coordinates: {
    latitude: number
    longitude: number
  }
  region: {
    id: string
    text: string
    mapboxId: string | undefined
  } | null
  country: {
    id: string
    text: string
    mapboxId: string | undefined
  } | null
}

// Export all types/interfaces
export type { MapboxFeatureCollection, MapboxFeature, MapboxProperties, MapboxGeometry, MapboxContext, MapboxPlace }
