export interface GeoJsonLineString {
  type: string
  coordinates: [number, number][]
}

export interface Polyline {
  geoJsonLinestring: GeoJsonLineString
}

export interface Leg {
  polyline: Polyline
}

export interface Route {
  legs: Leg[]
}
