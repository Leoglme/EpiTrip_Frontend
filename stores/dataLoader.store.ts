import { defineStore } from 'pinia'
import { useGoogleApiStore } from '#imports'
import type { Coordinates } from '~/core/types/google-places'
import { useRouterStore } from '~/stores/router.store'

type tLoadParam = {
  fetchProgressionStatus: number
}

export const useDataLoaderStore = defineStore('dataLoaderStore', {
  state: () => ({
    fetchAppDataInProgress: false,
    currentFetchType: '',
    currentFetchCompletion: 0,
  }),
  actions: {
    /* SETTERS */
    setFetchAppDataInProgress(fetchAppDataInProgress: boolean): void {
      this.fetchAppDataInProgress = fetchAppDataInProgress
    },
    setCurrentFetchType(currentFetchType: string): void {
      this.currentFetchType = currentFetchType
    },
    setCurrentFetchCompletion(currentFetchCompletion: number): void {
      this.currentFetchCompletion = currentFetchCompletion
    },

    /* UPDATERS */
    updateCurrentFetch(fetchType: string, fetchCompletion: number): void {
      this.setCurrentFetchType(fetchType)
      this.setCurrentFetchCompletion(fetchCompletion)
    },
    resetCurrentFetch(): void {
      this.setCurrentFetchType('')
      this.setCurrentFetchCompletion(0)
    },

    /* FETCH DATA */
    async loadGoogleEatRestaurants(
      params: tLoadParam,
      startCoordinates: Coordinates,
      endCoordinates: Coordinates,
    ): Promise<void> {
      this.updateCurrentFetch('Restaurants', params.fetchProgressionStatus)
      await useGoogleApiStore().fetchRestaurants(startCoordinates, endCoordinates)
    },

    async loadGoogleHotels(
      params: tLoadParam,
      startCoordinates: Coordinates,
      endCoordinates: Coordinates,
    ): Promise<void> {
      this.updateCurrentFetch('Hotels', params.fetchProgressionStatus)
      await useGoogleApiStore().fetchHotels(startCoordinates, endCoordinates)
    },

    async loadGoogleBars(
      params: tLoadParam,
      startCoordinates: Coordinates,
      endCoordinates: Coordinates,
    ): Promise<void> {
      this.updateCurrentFetch('Bars', params.fetchProgressionStatus)
      await useGoogleApiStore().fetchBars(startCoordinates, endCoordinates)
    },

    async loadGoogleEvents(
      params: tLoadParam,
      startCoordinates: Coordinates,
      endCoordinates: Coordinates,
    ): Promise<void> {
      this.updateCurrentFetch('Événements', params.fetchProgressionStatus)
      await useGoogleApiStore().fetchEvents(startCoordinates, endCoordinates)
    },

    async loadGoogleTransports(
      params: tLoadParam,
      startCoordinates: Coordinates,
      endCoordinates: Coordinates,
    ): Promise<void> {
      this.updateCurrentFetch('Transports', params.fetchProgressionStatus)
      await useGoogleApiStore().fetchTransports(startCoordinates, endCoordinates)
    },

    sleep(ms: number): Promise<void> {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },

    async fetchData(): Promise<void> {
      this.setFetchAppDataInProgress(true)
      const routerStore = useRouterStore()

      console.log({
        startCoordinates: routerStore.startCoordinates,
        endCoordinates: routerStore.endCoordinates,
      })
      if (routerStore.startCoordinates && routerStore.endCoordinates) {
        await this.loadGoogleTransports(
          { fetchProgressionStatus: 0 },
          routerStore.startCoordinates,
          routerStore.endCoordinates,
        )
        await this.loadGoogleEatRestaurants(
          { fetchProgressionStatus: 10 },
          routerStore.startCoordinates,
          routerStore.endCoordinates,
        )
        await this.sleep(500)
        await this.loadGoogleHotels(
          { fetchProgressionStatus: 40 },
          routerStore.startCoordinates,
          routerStore.endCoordinates,
        )
        await this.sleep(500)
        await this.loadGoogleBars(
          { fetchProgressionStatus: 70 },
          routerStore.startCoordinates,
          routerStore.endCoordinates,
        )
        await this.sleep(500)
        await this.loadGoogleEvents(
          { fetchProgressionStatus: 90 },
          routerStore.startCoordinates,
          routerStore.endCoordinates,
        )
        this.setCurrentFetchCompletion(100)
      }
      // await this.loadGoogleHotel({ fetchProgressionStatus: 65 })
      // await this.loadGoogleBar({ fetchProgressionStatus: 100 })
      this.setFetchAppDataInProgress(false)
      this.resetCurrentFetch()
    },
  },
})
