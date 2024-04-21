import { defineStore } from 'pinia'
import type { Coordinates } from '~/core/types/google-places'

function parseCoordinates(coords: string | null): Coordinates | null {
  if (!coords) {
    return null
  }

  const parts: string[] = coords.split(',')
  if (parts.length !== 2) {
    return null
  }

  const latitude: number = parseFloat(parts[0])
  const longitude: number = parseFloat(parts[1])

  if (isNaN(latitude) || isNaN(longitude)) {
    return null
  }

  return { latitude, longitude }
}

export const useRouterStore = defineStore('routerStore', {
  state: () => ({
    startCoordinates: null as Coordinates | null,
    endCoordinates: null as Coordinates | null,
  }),
  actions: {
    setStartCoordinates(coordinates: Coordinates | null): void {
      this.startCoordinates = coordinates
    },
    setEndCoordinates(coordinates: Coordinates | null): void {
      this.endCoordinates = coordinates
    },
    setCoordinates(start: string | null, end: string | null): void {
      this.setStartCoordinates(parseCoordinates(start))
      this.setEndCoordinates(parseCoordinates(end))
    },
  },
  getters: {
    areCoordinatesAvailable(): boolean {
      return this.startCoordinates !== null && this.endCoordinates !== null
    },
  },
})
