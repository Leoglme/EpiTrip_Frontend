import { defineStore } from 'pinia'
import type { Coordinates, GoogleRestaurant, GoogleBar, GoogleHotel, GoogleEvent } from '~/core/types/google-places'
import type { ErrorResponse } from '~/core/types/response'
import GooglePlacesService from '~/core/services/GooglePlacesService'
import { useNotyfStore } from '~/stores/notyf.store'
import type { TransportOptions } from '~/core/types/google-directions'
import GoogleDirectionsService from '~/core/services/GoogleDirectionsService'

export const useGoogleApiStore = defineStore('googleApiStore', {
  state: () => ({
    restaurants: [] as GoogleRestaurant[],
    bars: [] as GoogleBar[],
    hotels: [] as GoogleHotel[],
    events: [] as GoogleEvent[],
    transports: null as TransportOptions | null,
  }),
  actions: {
    /* SETTERS */
    setRestaurants(restaurants: GoogleRestaurant[]): void {
      this.restaurants = restaurants
    },
    setBars(bars: GoogleBar[]): void {
      this.bars = bars
    },
    setHotels(hotels: GoogleHotel[]): void {
      this.hotels = hotels
    },
    setEvents(events: GoogleEvent[]): void {
      this.events = events
    },
    setTransports(transports: TransportOptions | null): void {
      this.transports = transports
    },
    /* FETCHERS */
    async fetchRestaurants(start: Coordinates, end: Coordinates): Promise<void> {
      try {
        const googleRestaurants: GoogleRestaurant[] | ErrorResponse = await GooglePlacesService.eat(start, end)
        if (googleRestaurants && !('message' in googleRestaurants)) {
          this.setRestaurants(googleRestaurants as GoogleRestaurant[])
        }
      } catch (error) {
        useNotyfStore().responseError(error as ErrorResponse, 'Failed to fetch restaurants')
        throw error
      }
    },
    async fetchBars(start: Coordinates, end: Coordinates): Promise<void> {
      try {
        const googleBars: GoogleBar[] | ErrorResponse = await GooglePlacesService.drink(start, end)
        if (googleBars && !('message' in googleBars)) {
          this.setBars(googleBars as GoogleRestaurant[])
        }
      } catch (error) {
        useNotyfStore().responseError(error as ErrorResponse, 'Failed to fetch bars')
        throw error
      }
    },
    async fetchHotels(start: Coordinates, end: Coordinates): Promise<void> {
      try {
        const googleHotels: GoogleHotel[] | ErrorResponse = await GooglePlacesService.sleep(start, end)
        if (googleHotels && !('message' in googleHotels)) {
          this.setHotels(googleHotels as GoogleRestaurant[])
        }
      } catch (error) {
        useNotyfStore().responseError(error as ErrorResponse, 'Failed to fetch bars')
        throw error
      }
    },
    async fetchEvents(start: Coordinates, end: Coordinates): Promise<void> {
      try {
        const googleEvents: GoogleBar[] | ErrorResponse = await GooglePlacesService.enjoy(start, end)
        if (googleEvents && !('message' in googleEvents)) {
          this.setEvents(googleEvents as GoogleRestaurant[])
        }
      } catch (error) {
        useNotyfStore().responseError(error as ErrorResponse, 'Failed to fetch bars')
        throw error
      }
    },
    async fetchTransports(start: Coordinates, end: Coordinates): Promise<void> {
      try {
        const googleTransports: TransportOptions | null | ErrorResponse = await GoogleDirectionsService.travel(
          start,
          end,
        )
        if (googleTransports && !('message' in googleTransports)) {
          this.setTransports(googleTransports as TransportOptions | null)
        }
      } catch (error) {
        useNotyfStore().responseError(error as ErrorResponse, 'Failed to fetch transports')
        throw error
      }
    },
  },
  getters: {
    numberOfRestaurants: (state): number => state.restaurants.length,
  },
})
