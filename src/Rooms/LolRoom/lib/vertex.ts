import { DataViewCustom } from './dataViewCustom'

/**
 * @author lolking / http://www.lolking.net/models
 * @author tengge / https://github.com/tengge1
 */
export class Vertex {
  position: [number, number, number]
  normal: [number, number, number, number]
  u: number
  v: number
  bones: number[]
  weights: number[]

  constructor(r: DataViewCustom) {
    this.position = [r.getFloat(), r.getFloat(), r.getFloat()]
    this.normal = [r.getFloat(), r.getFloat(), r.getFloat(), 0]
    this.u = r.getFloat()
    this.v = r.getFloat()
    this.bones = new Array(4)
    for (let i = 0; i < 4; ++i) {
      this.bones[i] = r.getUint8()
    }
    this.weights = new Array(4)
    for (let i = 0; i < 4; ++i) {
      this.weights[i] = r.getFloat()
    }
  }
}