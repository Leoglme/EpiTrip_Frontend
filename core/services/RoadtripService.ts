// services/RoadtripService.ts
import BaseApiService from '@/core/services/BaseApiService'
import type { CreateRoadtripPayload, UpdateRoadtripPayload, Roadtrip, Step } from '~/core/types/roadtrip'
import type { ErrorResponse } from '~/core/types/response'

export default class RoadtripService extends BaseApiService {
  static async createRoadtrip(payload: CreateRoadtripPayload): Promise<ErrorResponse | Roadtrip> {
    return await this.post('/roadtrips', payload)
  }

  static async updateRoadtrip(id: number, payload: UpdateRoadtripPayload): Promise<ErrorResponse | Roadtrip> {
    return await this.put(`/roadtrips/${id}`, payload)
  }

  static async getAllRoadtrips(): Promise<ErrorResponse | Roadtrip[]> {
    return await this.get('/roadtrips')
  }

  static async getRoadtrip(id: number): Promise<ErrorResponse | Roadtrip | undefined> {
    return await this.get(`/roadtrips/${id}`)
  }

  static async createOrUpdateSteps(roadtripId: number, steps: Step[]): Promise<ErrorResponse | Step[]> {
    return await this.post(`/roadtrips/${roadtripId}/steps`, { steps })
  }

  static async getSteps(roadtripId: number): Promise<ErrorResponse | Step[]> {
    return await this.get(`/roadtrips/${roadtripId}/steps`)
  }
}
