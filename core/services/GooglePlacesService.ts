import BaseApiService from '@/core/services/BaseApiService'
import type { ErrorResponse } from '~/core/types/response'
import type { Coordinates, GoogleRestaurant, GoogleHotel, GoogleBar, GoogleEvent } from '~/core/types/google-places'

export default class GooglePlacesService extends BaseApiService {
  /**
   * Sends a request for restaurant information between two points.
   * @param {Coordinates} start Departure coordinates.
   * @param {Coordinates} end Arrival coordinates.
   * @returns {Promise<GoogleRestaurant[] | ErrorResponse>} A promise resolved with restaurant information or an error.
   */
  static async eat(start: Coordinates, end: Coordinates): Promise<GoogleRestaurant[] | ErrorResponse> {
    return await this.post<GoogleRestaurant[]>('/eat', { start, end })
  }

  /**
   * Sends a request for bar information between two points.
   * @param {Coordinates} start Departure coordinates.
   * @param {Coordinates} end Arrival coordinates.
   * @returns {Promise<GoogleBar[] | ErrorResponse>} A promise resolved with bar information or an error.
   */
  static async drink(start: Coordinates, end: Coordinates): Promise<GoogleBar[] | ErrorResponse> {
    return await this.post<GoogleBar[]>('/drink', { start, end })
  }

  /**
   * Sends a request for hotel information between two points.
   * @param {Coordinates} start Departure coordinates.
   * @param {Coordinates} end Arrival coordinates.
   * @returns {Promise<GoogleHotel[] | ErrorResponse>} A promise resolved with hotel information or an error.
   */

  static async sleep(start: Coordinates, end: Coordinates): Promise<GoogleHotel[] | ErrorResponse> {
    return await this.post<GoogleHotel[]>('/sleep', { start, end })
  }

  /**
   * Sends a request for event information between two points.
   * @param {Coordinates} start Departure coordinates.
   * @param {Coordinates} end Arrival coordinates.
   * @returns {Promise<GoogleEvent[] | ErrorResponse>} A promise resolved with event information or an error.
   */
  static async enjoy(start: Coordinates, end: Coordinates): Promise<GoogleEvent[] | ErrorResponse> {
    return await this.post<GoogleEvent[]>('/enjoy', { start, end })
  }
}
