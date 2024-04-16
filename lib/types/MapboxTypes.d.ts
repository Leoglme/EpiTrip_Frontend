export interface MapboxRoute {
  geometry: {
    coordinates: CoordinateTuple[]
    type: string
  }
  legs: MapboxLeg[]
  weight: number
  distance: number
  duration: number
}

export interface MapboxLeg {
  summary: string
  weight: number
  distance: number
  duration: number
  steps: MapboxStep[]
}

export interface MapboxStep {
  geometry: {
    coordinates: CoordinateTuple[]
    type: string
  }
  driving_side: string
  mode: string
  weight: number
  distance: number
  duration: number
  name: string
  maneuver: {
    bearing_after: number
    bearing_before: number
    location: CoordinateTuple
    modifier: string
    type: string
    instruction: string
  }
}

export type CoordinateTuple = [number, number]
