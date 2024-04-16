import { defineStore } from 'pinia'
import type { ErrorResponse } from '~/core/types/response'
import type { MapboxPlace } from '~/core/types/mapbox'
import MapboxService from '~/core/services/MapboxService'
import { useAppStore } from '@/stores/app.store'
import { useNotyfStore } from '~/stores/notyf.store'

export const useMapboxStore = defineStore('mapboxStore', {
  state: () => ({
    places: [] as MapboxPlace[],
  }),
  actions: {
    setPlaces(places: MapboxPlace[]): void {
      this.places = places
    },
    async searchPlaces(query: string): Promise<void> {
      try {
        const places: MapboxPlace[] = await useAppStore().execWithPending<MapboxPlace[]>(
          async (): Promise<MapboxPlace[]> => {
            const response: MapboxPlace[] | ErrorResponse = await MapboxService.search(query)
            if (response && !('code' in response)) {
              return response as MapboxPlace[]
            } else {
              throw response
            }
          },
        )

        this.setPlaces(places)
      } catch (e) {
        useNotyfStore().responseError(e as ErrorResponse, 'Failed to search places')
        throw e
      }
    },
  },
  getters: {
    numberOfPlaces: (state) => state.places.length,
  },
})
