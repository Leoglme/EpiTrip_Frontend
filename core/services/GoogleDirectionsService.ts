import BaseApiService from '@/core/services/BaseApiService'
import type { ErrorResponse } from '~/core/types/response'
import type { Coordinates } from '~/core/types/google-places'
import type { TransportOptions } from '~/core/types/google-directions'

export default class GoogleDirectionsService extends BaseApiService {
  /**
   * Sends a request for retrieve type of transport available between two points.
   * @param {Coordinates} start Departure coordinates.
   * @param {Coordinates} end Arrival coordinates.
   * @returns {Promise<TransportOptions[] | ErrorResponse>} A promise resolved with transport information or an error.
   */

  static async travel(start: Coordinates, end: Coordinates): Promise<TransportOptions | ErrorResponse> {
    return await this.post<TransportOptions>('/travel', { start, end })
  }
}
