// useMapStore.ts
import { defineStore } from 'pinia'
// import MapService from '@/lib/services/MapService'
//
// import type { Point } from 'geojson'

export const useMapStore = defineStore('MapStore', {
  state: () => ({
    // Vous pourriez vouloir refléter l'état de mapService ici ou juste le laisser gérer par mapService directement
  }),
  actions: {
    // setStart(point: Point) {
    //   MapService.setStart(point);
    // },
    // setEnd(point: Point) {
    //   MapService.setEnd(point);
    // },
    // addStep(point: Point) {
    //   MapService.addStep(point);
    // },
    // removeStep(index: number) {
    //   MapService.removeStep(index);
    // },
    // resetRoute() {
    //   MapService.reset();
    // },
    // getRoute() {
    //   return {
    //     start: MapService.start,
    //     end: MapService.end,
    //     steps: MapService.steps,
    //   };
    // }
  },
})
