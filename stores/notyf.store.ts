import { defineStore } from 'pinia'
import type { ErrorResponse } from '~/core/types/response'
import NotyfService from '~/lib/services/NotyfService'

export const useNotyfStore = defineStore('notyfStore', {
  state: () => ({}),
  actions: {
    responseError(responseError: ErrorResponse, callBackMessage: string): void {
      console.log({
        responseError,
        callBackMessage,
      })

      const notyf: NotyfService = new NotyfService()

      notyf.error(responseError.errors?.[0].message || callBackMessage)
    },
  },
})
