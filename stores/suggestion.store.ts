import { defineStore } from 'pinia'
import type { Coordinates } from '~/core/types/geo'

export type SuggestionTab = {
  id: number
  name: string
  iconClass: string
}

export const useSuggestionStore = defineStore('suggestionStore', {
  state: () => ({
    activeTabId: 1,
    selectedCoordinates: null as Coordinates | null,
    isRefreshing: false,
  }),
  actions: {
    setActiveTabId(id: number): void {
      this.activeTabId = id
    },
    setSelectedCoordinates(coordinates: Coordinates): void {
      this.selectedCoordinates = coordinates
    },
    setIsRefreshing(value: boolean): void {
      this.isRefreshing = value
    },
  },
  getters: {
    suggestions: (): SuggestionTab[] => [
      {
        id: 1,
        name: 'Restaurants',
        iconClass: 'fas fa-utensils',
      },
      {
        id: 2,
        name: 'Bars',
        iconClass: 'fas fa-glass-martini-alt',
      },
      {
        id: 3,
        name: 'Hotels',
        iconClass: 'fas fa-bed',
      },
      {
        id: 4,
        name: 'Évènement',
        iconClass: 'fas fa-calendar-alt',
      },
      {
        id: 5,
        name: 'Transports',
        iconClass: 'fas fa-bus',
      },
      {
        id: 6,
        name: 'Mon roadtrip',
        iconClass: 'fas fa-route',
      },
    ],
  },
})
