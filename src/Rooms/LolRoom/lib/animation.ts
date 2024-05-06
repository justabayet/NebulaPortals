import { AnimationBone } from './animationBone'
import { DataViewCustom } from './dataViewCustom'
import { Model } from './model'

export class Animation {
  model: Model
  name: string
  fps: number
  bones: AnimationBone[]
  lookup: Record<string, number>
  duration: number

  constructor(model: Model, r: DataViewCustom, version: number) {
    this.model = model
    this.name = r.getString().toLowerCase()
    this.fps = r.getInt32()
    const numBones = r.getUint32()
    this.bones = new Array(numBones)
    this.lookup = {}
    for (let i = 0; i < numBones; ++i) {
      this.bones[i] = new AnimationBone(model, this, r, version)
      this.lookup[this.bones[i].bone] = i
    }
    if (numBones == 0 || this.fps <= 1) {
      this.duration = 1e3
    } else {
      this.duration = Math.floor(1e3 * (this.bones[0].frames.length / this.fps))
    }
  }
}