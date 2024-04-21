import axios from 'axios'
import type { AxiosError } from 'axios'
import type { ErrorResponse } from '~/core/types/response'
import CookieService from '@/core/services/CookieService'

export default class BaseApiService {
  protected static apiUrl: string | undefined = import.meta.env.VITE_API_BASE_URL

  protected static client() {
    const token: string | undefined = CookieService.getCookie('authToken')

    return axios.create({
      baseURL: this.apiUrl,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
  }

  protected static async get<T>(url: string): Promise<T> {
    const response = await this.client().get(url)
    return response.data
  }

  protected static async post<T>(url: string, data: unknown): Promise<T | ErrorResponse> {
    try {
      const response = await this.client().post(url, data)
      return response.data
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>
      throw error.response?.data
    }
  }

  protected static async put<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.client().put(url, data)
    return response.data
  }

  protected static async delete<T>(url: string): Promise<T> {
    const response = await this.client().delete(url)
    return response.data
  }
}
