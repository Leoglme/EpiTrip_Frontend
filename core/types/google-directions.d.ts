interface GoogleDirectionsResponse {
  geocoded_waypoints: GeocodedWaypoint[]
  routes: Route[]
  status: string
}

interface GeocodedWaypoint {
  geocoder_status: string
  place_id: string
  types: string[]
}

interface Route {
  bounds: LatLngBounds
  copyrights: string
  legs: Leg[]
  overview_polyline: Polyline
  summary: string
  warnings: string[]
  waypoint_order: number[]
}

interface LatLngBounds {
  northeast: LatLng
  southwest: LatLng
}

interface LatLng {
  lat: number
  lng: number
}

interface Leg {
  distance: Distance
  duration: Duration
  end_address: string
  end_location: LatLng
  start_address: string
  start_location: LatLng
  steps: Step[]
  traffic_speed_entry: any[]
  via_waypoint: any[]
}

interface Step {
  distance: Distance
  duration: Duration
  end_location: LatLng
  html_instructions: string
  polyline: Polyline
  start_location: LatLng
  travel_mode: string
}

interface Distance {
  text: string
  value: number
}

interface Duration {
  text: string
  value: number
}

interface Polyline {
  points: string
}

type TransportMode = 'driving' | 'transit' | 'bicycling' | 'walking'

interface TransportOption {
  distance: Distance
  duration: Duration
}

type TransportOptions = Record<TransportMode, TransportOption | undefined>

export type {
  GoogleDirectionsResponse,
  GeocodedWaypoint,
  Route,
  LatLngBounds,
  LatLng,
  Leg,
  Step,
  Distance,
  Duration,
  Polyline,
  TransportMode,
  TransportOption,
  TransportOptions,
}
