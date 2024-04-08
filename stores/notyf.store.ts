import { defineStore } from 'pinia'
import { Notyf } from 'notyf'
import type { ErrorResponse } from '~/core/types/response'

export const useNotyfStore = defineStore('notyfStore', {
  state: () => ({
    notyf: undefined as Notyf | undefined,
  }),
  actions: {
    init(): void {
      this.setNotyf()
      this.dismissAll()
    },
    setNotyf(): void {
      const notyf: Notyf = new Notyf()
      notyf.options = {
        ...notyf.options,
        dismissible: true,
        duration: 5000,
        position: {
          x: 'right',
          y: 'top',
        },
      }
      this.notyf = notyf
    },
    success(message: string): void {
      this.init()
      if (this.notyf) {
        this.notyf.success(message)
      }
    },
    responseError(responseError: ErrorResponse, callBackMessage: string): void {
      console.log({
        responseError,
        callBackMessage,
      })
      this.init()
      console.log(this.notyf)
      if (this.notyf) {
        this.notyf.error(responseError.errors?.[0].message || callBackMessage)
      }
    },
    error(message: string): void {
      this.init()
      console.log(this.notyf)
      if (this.notyf) {
        this.notyf.error(message)
      }
    },
    info(message: string): void {
      this.init()
      if (this.notyf) {
        this.notyf.open({ type: 'info', message })
      }
    },
    warn(message: string): void {
      this.init()
      if (this.notyf) {
        this.notyf.open({ type: 'warn', message })
      }
    },
    dismissAll(): void {
      if (this.notyf) {
        this.notyf.dismissAll()
      }
    },
  },
})
