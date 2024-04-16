import BaseApiService from '@/core/services/BaseApiService'
import type { ErrorResponse } from '~/core/types/response'
import type { MapboxPlace } from '~/core/types/mapbox'

export default class MapboxService extends BaseApiService {
  static async search(query: string): Promise<ErrorResponse | MapboxPlace[]> {
    return await this.get(`/places/search?q=${encodeURIComponent(query)}`)
  }
}
