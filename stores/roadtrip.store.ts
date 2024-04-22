import { defineStore } from 'pinia'
import type { Coordinates, GooglePlace } from '~/core/types/google-places'
import { useRouterStore } from '~/stores/router.store'
import type { Roadtrip } from '~/core/types/roadtrip'
import RoadtripService from '~/core/services/RoadtripService'
import NotyfService from '~/lib/services/NotyfService'
import type { ErrorResponse } from '~/core/types/response'

export const useRoadtripStore = defineStore('roadtrip', {
  state: () => ({
    roadtrips: [] as Roadtrip[],
    steps: [] as GooglePlace[],
    orderedSteps: [] as GooglePlace[],
  }),
  actions: {
    setRoadtrips(roadtrips: Roadtrip[]): void {
      this.roadtrips = roadtrips
    },
    addStep(place: GooglePlace): void {
      this.steps.push(place)
      this.orderedSteps = [...this.steps].sort((a: GooglePlace, b: GooglePlace): number =>
        this.compareSteps(a.location, b.location),
      )
    },
    isStepAdded(place: GooglePlace): boolean {
      return this.steps.some((step: GooglePlace): boolean => step.location === place.location)
    },
    removeStep(place: GooglePlace): void {
      console.log('Removing step', place.location)
      console.log('LENGTH', this.steps.length)
      this.steps = this.steps.filter((step: GooglePlace): boolean => step.location !== place.location)
      console.log('LENGTH AFTER', this.steps.length)
    },
    // API
    async fetchAllRoadtrips(): Promise<void> {
      const roadtrips: Roadtrip[] | ErrorResponse = await RoadtripService.getAllRoadtrips()

      // verify if roadtrips is an array and not an error object
      if (Array.isArray(roadtrips)) {
        this.setRoadtrips(roadtrips)
      } else {
        const notyf: NotyfService = new NotyfService()
        notyf.error('Failed to fetch roadtrips')
      }
    },
    // Order steps by distance from start and end (closest to start first)
    compareSteps(a: Coordinates, b: Coordinates): number {
      const startCoordinates: Coordinates | null = useRouterStore().startCoordinates
      const endCoordinates: Coordinates | null = useRouterStore().endCoordinates
      if (!startCoordinates || !endCoordinates) {
        return 0
      }

      const distanceToStartA: number = this.calculateDistance(a, startCoordinates)
      const distanceToStartB: number = this.calculateDistance(b, startCoordinates)
      const distanceToEndA: number = this.calculateDistance(a, endCoordinates)
      const distanceToEndB: number = this.calculateDistance(b, endCoordinates)

      return distanceToStartA + distanceToEndA - distanceToStartB - distanceToEndB
    },

    calculateDistance(a: Coordinates, b: Coordinates): number {
      const lat1: number = a.latitude
      const lon1: number = a.longitude
      const lat2: number = b.latitude
      const lon2: number = b.longitude
      const R: number = 6371 // Radius of the earth in km
      const dLat: number = this.deg2rad(lat2 - lat1)
      const dLon: number = this.deg2rad(lon2 - lon1)
      const A: number =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
      const C: number = 2 * Math.atan2(Math.sqrt(A), Math.sqrt(1 - A))
      const distance: number = R * C // Distance in km
      return distance
    },

    deg2rad(deg: number): number {
      return deg * (Math.PI / 180)
    },
  },
  getters: {},
})
