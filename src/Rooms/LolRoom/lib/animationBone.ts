
import { mat4, vec3, quat } from 'gl-matrix'
import { DataViewCustom } from './dataViewCustom'
import { Animation } from './animation'
import { Position, Rotation, Scale } from './types'
import { Model } from './model'
/**
 * @author lolking / http://www.lolking.net/models
 * @author tengge / https://github.com/tengge1
 */

interface Frame {
  pos: Position
  rot: Rotation
  scale: Scale
}

export class AnimationBone {
  model: Model
  anim: Animation
  bone: string
  flags: number
  frames: Frame[]
  matrix: mat4
  tmpMat: mat4
  tmpMat2: mat4
  tmpPos: vec3
  tmpRot: quat
  tmpScale: vec3
  index?: number

  constructor(model: Model, anim: Animation, r: DataViewCustom, version: number) {
    this.model = model
    this.anim = anim
    const numFrames = r.getUint32()
    this.bone = r.getString().toLowerCase()
    this.flags = r.getUint32()
    this.frames = new Array(numFrames)
    let scale: Scale = [1, 1, 1]
    for (let i = 0; i < numFrames; ++i) {
      const pos: Position = [r.getFloat(), r.getFloat(), r.getFloat()]
      const rot: Rotation = [r.getFloat(), r.getFloat(), r.getFloat(), r.getFloat()]
      if (version >= 3) scale = [r.getFloat(), r.getFloat(), r.getFloat()]
      this.frames[i] = {
        pos,
        rot,
        scale,
      }
    }
    this.matrix = mat4.create()
    this.tmpMat = mat4.create()
    this.tmpMat2 = mat4.create()
    this.tmpPos = vec3.create()
    this.tmpRot = quat.create()
    this.tmpScale = vec3.create()
  }

  update(boneId: number, frame: number, r: number) {
    if(this.model.bones == null ||
      this.model.transforms == null 
    ) return

    this.index = boneId
    const parent = this.model.bones[boneId].parent
    const f0 = frame % this.frames.length,
      f1 = (frame + 1) % this.frames.length
    vec3.lerp(this.tmpPos, this.frames[f0].pos, this.frames[f1].pos, r)
    vec3.lerp(this.tmpScale, this.frames[f0].scale, this.frames[f1].scale, r)
    quat.slerp(this.tmpRot, this.frames[f0].rot, this.frames[f1].rot, r)
    this.translation(this.tmpMat2, this.tmpPos)
    this.rotationQuat(this.tmpMat, this.tmpRot)
    this.mulSlimDX(this.matrix, this.tmpMat, this.tmpMat2)
    if (parent != -1) {
      this.mulSlimDX(this.matrix, this.matrix, this.model.transforms[parent])
    }
    mat4.copy(this.model.transforms[boneId], this.matrix)
  }

  translation(out: mat4, vec: vec3) {
    mat4.identity(out)
    out[12] = vec[0]
    out[13] = vec[1]
    out[14] = vec[2]
    return out
  }

  rotationQuat(out: mat4, q: quat) {
    mat4.identity(out)
    const xx = q[0] * q[0],
      yy = q[1] * q[1],
      zz = q[2] * q[2],
      xy = q[0] * q[1],
      zw = q[2] * q[3],
      zx = q[2] * q[0],
      yw = q[1] * q[3],
      yz = q[1] * q[2],
      xw = q[0] * q[3]
    out[0] = 1 - 2 * (yy + zz)
    out[1] = 2 * (xy + zw)
    out[2] = 2 * (zx - yw)
    out[4] = 2 * (xy - zw)
    out[5] = 1 - 2 * (zz + xx)
    out[6] = 2 * (yz + xw)
    out[8] = 2 * (zx + yw)
    out[9] = 2 * (yz - xw)
    out[10] = 1 - 2 * (yy + xx)
    return out
  }

  mulSlimDX(out: mat4, l: mat4, r: mat4) {
    const left = {
      M11: l[0],
      M12: l[1],
      M13: l[2],
      M14: l[3],
      M21: l[4],
      M22: l[5],
      M23: l[6],
      M24: l[7],
      M31: l[8],
      M32: l[9],
      M33: l[10],
      M34: l[11],
      M41: l[12],
      M42: l[13],
      M43: l[14],
      M44: l[15],
    }
    const right = {
      M11: r[0],
      M12: r[1],
      M13: r[2],
      M14: r[3],
      M21: r[4],
      M22: r[5],
      M23: r[6],
      M24: r[7],
      M31: r[8],
      M32: r[9],
      M33: r[10],
      M34: r[11],
      M41: r[12],
      M42: r[13],
      M43: r[14],
      M44: r[15],
    }
    out[0] =
      left.M11 * right.M11 +
      left.M12 * right.M21 +
      left.M13 * right.M31 +
      left.M14 * right.M41
    out[1] =
      left.M11 * right.M12 +
      left.M12 * right.M22 +
      left.M13 * right.M32 +
      left.M14 * right.M42
    out[2] =
      left.M11 * right.M13 +
      left.M12 * right.M23 +
      left.M13 * right.M33 +
      left.M14 * right.M43
    out[3] =
      left.M11 * right.M14 +
      left.M12 * right.M24 +
      left.M13 * right.M34 +
      left.M14 * right.M44
    out[4] =
      left.M21 * right.M11 +
      left.M22 * right.M21 +
      left.M23 * right.M31 +
      left.M24 * right.M41
    out[5] =
      left.M21 * right.M12 +
      left.M22 * right.M22 +
      left.M23 * right.M32 +
      left.M24 * right.M42
    out[6] =
      left.M21 * right.M13 +
      left.M22 * right.M23 +
      left.M23 * right.M33 +
      left.M24 * right.M43
    out[7] =
      left.M21 * right.M14 +
      left.M22 * right.M24 +
      left.M23 * right.M34 +
      left.M24 * right.M44
    out[8] =
      left.M31 * right.M11 +
      left.M32 * right.M21 +
      left.M33 * right.M31 +
      left.M34 * right.M41
    out[9] =
      left.M31 * right.M12 +
      left.M32 * right.M22 +
      left.M33 * right.M32 +
      left.M34 * right.M42
    out[10] =
      left.M31 * right.M13 +
      left.M32 * right.M23 +
      left.M33 * right.M33 +
      left.M34 * right.M43
    out[11] =
      left.M31 * right.M14 +
      left.M32 * right.M24 +
      left.M33 * right.M34 +
      left.M34 * right.M44
    out[12] =
      left.M41 * right.M11 +
      left.M42 * right.M21 +
      left.M43 * right.M31 +
      left.M44 * right.M41
    out[13] =
      left.M41 * right.M12 +
      left.M42 * right.M22 +
      left.M43 * right.M32 +
      left.M44 * right.M42
    out[14] =
      left.M41 * right.M13 +
      left.M42 * right.M23 +
      left.M43 * right.M33 +
      left.M44 * right.M43
    out[15] =
      left.M41 * right.M14 +
      left.M42 * right.M24 +
      left.M43 * right.M34 +
      left.M44 * right.M44
    return out
  }
}
