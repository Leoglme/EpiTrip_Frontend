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

export type { MapboxPlace }
