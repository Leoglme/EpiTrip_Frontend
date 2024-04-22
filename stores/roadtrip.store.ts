import { defineStore } from 'pinia'
import type { Coordinates, GooglePlace } from '~/core/types/google-places'

interface RoadtripStep {
  name: string
  location: Coordinates
}

export const useRoadtripStore = defineStore('roadtrip', {
  state: () => ({
    steps: [] as RoadtripStep[],
  }),
  actions: {
    addStep(place: GooglePlace): void {
      this.steps.push({
        name: place.name,
        location: place.location,
      })
    },
    isStepAdded(place: GooglePlace): boolean {
      return this.steps.some((step: RoadtripStep): boolean => step.location === place.location)
    },
    removeStep(place: GooglePlace): void {
      console.log('Removing step', place.location)
      console.log('LENGTH', this.steps.length)
      this.steps = this.steps.filter((step: RoadtripStep): boolean => step.location !== place.location)
      console.log('LENGTH AFTER', this.steps.length)
    },
  },
})
