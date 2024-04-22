export type Coordinates = {
  latitude: number
  longitude: number
}

export type Location = {
  id: number
  name: string
  latitude: number
  longitude: number
  imageUrl: string | null
}

export type Step = {
  id: number
  roadtripId: number
  locationId: number
  order: number
  googlePlaceId: string
  distanceFromPrevious: number
}

export type Roadtrip = {
  id: number
  userId: number
  startLocationId: number
  endLocationId: number
  startLocation?: Location
  endLocation?: Location
  steps?: Step[]
  createdAt: string
  updatedAt: string | null
}

export type CreateRoadtripPayload = {
  start: Coordinates
  end: Coordinates
}

export type UpdateRoadtripPayload = CreateRoadtripPayload

export type StepPayload = {
  googlePlaceId: string
  order: number
  distanceFromPrevious: number
}
