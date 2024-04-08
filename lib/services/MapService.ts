import type { Point } from '../types/points'

export default class MapService {
  static start: Point | null = null
  static end: Point | null = null
  static steps: Point[] = []

  static setStart(point: Point): void {
    this.start = point
  }

  static setEnd(point: Point): void {
    this.end = point
  }

  static addStep(point: Point): void {
    this.steps.push(point)
  }

  static removeStep(index: number): void {
    this.steps.splice(index, 1)
  }

  static getRoute(): (Point | null)[] {
    return [this.start, ...this.steps, this.end].filter((p) => p !== null) as Point[]
  }

  static reset(): void {
    this.start = null
    this.end = null
    this.steps = []
  }
}
