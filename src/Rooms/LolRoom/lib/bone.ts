
import { mat4 } from 'gl-matrix'
import { DataViewCustom } from './dataViewCustom'
import { Model } from './model'

/**
 * @author lolking / http://www.lolking.net/models
 * @author tengge / https://github.com/tengge1
 */
export class Bone {
  model: Model
  index: number
  name: string
  parent: number
  scale: number
  origMatrix: mat4
  baseMatrix: mat4
  incrMatrix: mat4

  constructor(model: Model, index: number, r: DataViewCustom) {
    this.model = model
    this.index = index
    this.name = r.getString().toLowerCase()
    this.parent = r.getInt32()
    this.scale = r.getFloat()
    this.origMatrix = mat4.create()
    for (let i = 0; i < 16; ++i) this.origMatrix[i] = r.getFloat()
    this.baseMatrix = mat4.clone(this.origMatrix)
    mat4.transpose(this.baseMatrix, this.baseMatrix)
    mat4.invert(this.baseMatrix, this.baseMatrix)
    mat4.transpose(this.origMatrix, this.origMatrix)
    this.incrMatrix = mat4.create()
    if (model.version! >= 2) {
      for (let i = 0; i < 16; ++i) this.incrMatrix[i] = r.getFloat()
      mat4.transpose(this.incrMatrix, this.incrMatrix)
    } else {
      mat4.identity(this.incrMatrix)
    }
  }
}