import { defineStore } from 'pinia'
import axios from 'axios'
import type { RouteRequestBodyGoogle } from '~/lib/types/ApiCallAndResponse'

export const useGoogleStore = defineStore('googleStore', {
  actions: {
    async getRoute(query: RouteRequestBodyGoogle): Promise<any> {
      try {
        const response = await axios.post('http://localhost:3333/google/travel', query)
        if (response.status === 200) {
          return response.data
        } else {
          throw new Error(`Failed to fetch route with status: ${response.status}`)
        }
      } catch (error) {
        console.error('Failed to fetch route:', error)
        throw error
      }
    },
  },
})
