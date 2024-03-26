import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', {
  state: () => ({
    pending: false,
  }),
  actions: {
    setPending(pending: boolean): void {
      this.pending = pending
    },
    async execWithPending<T>(func: () => Promise<T>): Promise<T> {
      try {
        this.setPending(true)
        return await func()
      } catch (error) {
        console.error(error)
        this.setPending(false)
        return Promise.reject(error)
      } finally {
        this.setPending(false)
      }
    },
  },
})
