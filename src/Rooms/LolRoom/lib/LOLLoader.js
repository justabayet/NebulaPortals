/* eslint-disable @typescript-eslint/no-this-alias */
import { inflate } from 'pako/lib/inflate.js'
import { dispatch } from 'd3-dispatch'
import { mat4, vec3, vec4, quat } from 'gl-matrix'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'
import { FileLoader } from 'three/src/loaders/FileLoader.js'
import { BufferGeometry } from 'three/src/core/BufferGeometry.js'
import { BufferAttribute } from 'three/src/core/BufferAttribute.js'
import { MeshPhongMaterial } from 'three/src/materials/MeshPhongMaterial.js'
/**
 * @author lolking / http://www.lolking.net/models
 * @author tengge / https://github.com/tengge1
 */
function DataView2(buffer) {
  this.buffer = new DataView(buffer)
  this.position = 0
}
DataView2.prototype.getBool = function () {
  var v = this.buffer.getUint8(this.position) != 0
  this.position += 1
  return v
}

DataView2.prototype.getUint8 = function () {
  var v = this.buffer.getUint8(this.position)
  this.position += 1
  return v
}

DataView2.prototype.getInt8 = function () {
  var v = this.buffer.getInt8(this.position)
  this.position += 1
  return v
}

DataView2.prototype.getUint16 = function () {
  var v = this.buffer.getUint16(this.position, true)
  this.position += 2
  return v
}

DataView2.prototype.getInt16 = function () {
  var v = this.buffer.getInt16(this.position, true)
  this.position += 2
  return v
}

DataView2.prototype.getUint32 = function () {
  var v = this.buffer.getUint32(this.position, true)
  this.position += 4
  return v
}

DataView2.prototype.getInt32 = function () {
  var v = this.buffer.getInt32(this.position, true)
  this.position += 4
  return v
}

DataView2.prototype.getFloat = function () {
  var v = this.buffer.getFloat32(this.position, true)
  this.position += 4
  return v
}

DataView2.prototype.getString = function (len) {
  if (len === undefined) len = this.getUint16()
  var str = ''
  for (var i = 0; i < len; ++i) {
    str += String.fromCharCode(this.getUint8())
  }
  return str
}

DataView2.prototype.setBool = function (v) {
  this.buffer.setUint8(this.position, v ? 1 : 0)
  this.position += 1
}

DataView2.prototype.setUint8 = function (v) {
  this.buffer.setUint8(this.position, v)
  this.position += 1
}

DataView2.prototype.setInt8 = function (v) {
  this.buffer.setInt8(this.position, v)
  this.position += 1
}

DataView2.prototype.setUint16 = function (v) {
  this.buffer.setUint16(this.position, v, true)
  this.position += 2
}

DataView2.prototype.setInt16 = function (v) {
  this.buffer.setInt16(this.position, v, true)
  this.position += 2
}

DataView2.prototype.setUint32 = function (v) {
  this.buffer.setUint32(this.position, v, true)
  this.position += 4
}

DataView2.prototype.setInt32 = function (v) {
  this.buffer.setInt32(this.position, v, true)
  this.position += 4
}

DataView2.prototype.setFloat = function (v) {
  this.buffer.setFloat32(this.position, v, true)
  this.position += 4
}

/**
 * @author lolking / http://www.lolking.net/models
 * @author tengge / https://github.com/tengge1
 */
function Vertex(r) {
  var self = this,
    i
  self.position = [r.getFloat(), r.getFloat(), r.getFloat()]
  self.normal = [r.getFloat(), r.getFloat(), r.getFloat(), 0]
  self.u = r.getFloat()
  self.v = r.getFloat()
  self.bones = new Array(4)
  for (i = 0; i < 4; ++i) {
    self.bones[i] = r.getUint8()
  }
  self.weights = new Array(4)
  for (i = 0; i < 4; ++i) {
    self.weights[i] = r.getFloat()
  }
}

/**
 * @author lolking / http://www.lolking.net/models
 * @author tengge / https://github.com/tengge1
 */
function Texture$1(model, url) {
  var self = this
  self.model = model
  self.url = url
  self.texture = null
  self.load()
}
Texture$1.prototype.load = function () {
  var self = this

  self.texture = new TextureLoader().load(self.url, function (texture) {
    self.onLoad.call(self, texture)
  })
}

Texture$1.prototype.onLoad = function (texture) {
  var self = this
  texture.flipY = false
  self.model.material.map = texture
  self.model.material.needsUpdate = true

  self.model.dispatch.call('loadTexture')
}

/**
 * @author lolking / http://www.lolking.net/models
 * @author tengge / https://github.com/tengge1
 */
function Bone(model, index, r) {
  var self = this,
    i
  self.model = model
  self.index = index
  self.name = r.getString().toLowerCase()
  self.parent = r.getInt32()
  self.scale = r.getFloat()
  self.origMatrix = mat4.create()
  for (i = 0; i < 16; ++i) self.origMatrix[i] = r.getFloat()
  self.baseMatrix = mat4.clone(self.origMatrix)
  mat4.transpose(self.baseMatrix, self.baseMatrix)
  mat4.invert(self.baseMatrix, self.baseMatrix)
  mat4.transpose(self.origMatrix, self.origMatrix)
  self.incrMatrix = mat4.create()
  if (model.version >= 2) {
    for (i = 0; i < 16; ++i) self.incrMatrix[i] = r.getFloat()
    mat4.transpose(self.incrMatrix, self.incrMatrix)
  } else {
    mat4.identity(self.incrMatrix)
  }
}
/**
 * @author lolking / http://www.lolking.net/models
 * @author tengge / https://github.com/tengge1
 */
function AnimationBone(model, anim, r, version) {
  var self = this
  self.model = model
  self.anim = anim
  var numFrames = r.getUint32()
  self.bone = r.getString().toLowerCase()
  self.flags = r.getUint32()
  self.frames = new Array(numFrames)
  var scale = [1, 1, 1]
  for (var i = 0; i < numFrames; ++i) {
    var pos = [r.getFloat(), r.getFloat(), r.getFloat()]
    var rot = [r.getFloat(), r.getFloat(), r.getFloat(), r.getFloat()]
    if (version >= 3) scale = [r.getFloat(), r.getFloat(), r.getFloat()]
    self.frames[i] = {
      pos: pos,
      rot: rot,
      scale: scale,
    }
  }
  self.matrix = mat4.create()
  self.tmpMat = mat4.create()
  self.tmpMat2 = mat4.create()
  self.tmpPos = vec3.create()
  self.tmpRot = quat.create()
  self.tmpScale = vec3.create()
}
AnimationBone.prototype.update = function (boneId, frame, r) {
  var self = this
  self.index = boneId
  var parent = self.model.bones[boneId].parent
  var f0 = frame % self.frames.length,
    f1 = (frame + 1) % self.frames.length
  vec3.lerp(self.tmpPos, self.frames[f0].pos, self.frames[f1].pos, r)
  vec3.lerp(self.tmpScale, self.frames[f0].scale, self.frames[f1].scale, r)
  quat.slerp(self.tmpRot, self.frames[f0].rot, self.frames[f1].rot, r)
  self.translation(self.tmpMat2, self.tmpPos)
  self.rotationQuat(self.tmpMat, self.tmpRot)
  self.mulSlimDX(self.matrix, self.tmpMat, self.tmpMat2)
  if (parent != -1) {
    self.mulSlimDX(self.matrix, self.matrix, self.model.transforms[parent])
  }
  mat4.copy(self.model.transforms[boneId], self.matrix)
}

AnimationBone.prototype.translation = function (out, vec) {
  mat4.identity(out)
  out[12] = vec[0]
  out[13] = vec[1]
  out[14] = vec[2]
  return out
}

AnimationBone.prototype.rotationQuat = function (out, q) {
  mat4.identity(out)
  var xx = q[0] * q[0],
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

AnimationBone.prototype.mulSlimDX = function (out, l, r) {
  var left = {
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
  var right = {
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

/**
 * @author lolking / http://www.lolking.net/models
 * @author tengge / https://github.com/tengge1
 */
function Animation(model, r, version) {
  var self = this,
    i
  self.model = model
  self.meshOverride = {}
  self.name = r.getString().toLowerCase()
  self.fps = r.getInt32()
  var numBones = r.getUint32()
  self.bones = new Array(numBones)
  self.lookup = {}
  for (i = 0; i < numBones; ++i) {
    self.bones[i] = new AnimationBone(model, self, r, version)
    self.lookup[self.bones[i].bone] = i
  }
  if (numBones == 0 || self.fps <= 1) {
    self.duration = 1e3
  } else {
    self.duration = Math.floor(1e3 * (self.bones[0].frames.length / self.fps))
  }
}

// /**
//  * @author lolking / http://www.lolking.net/models
//  * @author tengge / https://github.com/tengge1
//  */
// var BaseAnimations = {
//     19: {
//         0: {
//             all: "idle"
//         }
//     },
//     32: {
//         4: {
//             all: "idle1_bow",
//             idle1_bow: "idle1"
//         }
//     },
//     55: {
//         7: {
//             idle1_candycane_below: "idle1"
//         }
//     }
// };

/**
 * @author lolking / http://www.lolking.net/models
 * @author tengge / https://github.com/tengge1
 */
function Model(options) {
  var self = this
  self.champion = options.champion || '1'
  self.skin = options.skin || 0
  self.baseUrl = 'https://lolking-models.justabayet.com/'
  self.meshUrl = self.baseUrl + `models/${self.champion}_${self.skin}.lmesh`

  self.setFrame = options.setFrame

  self.loaded = false
  self.animsLoaded = false

  self.meshes = null
  self.vertices = null
  self.indices = null
  self.transforms = null
  self.bones = null
  self.boneLookup = {}
  self.enableTexture = options.enableTexture != null ? options.enableTexture: true
  self.animIndex = -1
  self.animName = null
  self.baseAnim = null
  self.newAnimation = false
  self.animCycle = true
  self.animTime = 0
  self.deltaTime = 0
  self.tmpMat = mat4.create()
  self.tmpVec = vec4.create()
  self.animStatus = true

  self.dispatch = dispatch('load', 'loadMesh', 'loadTexture', 'loadAnim')

  self.ambientColor = [0.35, 0.35, 0.35, 1]
  self.primaryColor = [1, 1, 1, 1]
  self.secondaryColor = [0.35, 0.35, 0.35, 1]
  self.lightDir1 = vec3.create()
  self.lightDir2 = vec3.create()
  self.lightDir3 = vec3.create()
  vec3.normalize(self.lightDir1, [5, 5, -5])
  vec3.normalize(self.lightDir2, [5, 5, 5])
  vec3.normalize(self.lightDir3, [-5, -5, -5])

  self.texture = null
  self.geometry = new BufferGeometry()
  self.material = new MeshPhongMaterial()

  var promise1 = new Promise((resolve) => {
    self.dispatch.on('loadMesh.Model', () => {
      resolve()
    })
  })
  var promise2 = new Promise((resolve) => {
    self.dispatch.on('loadAnim.Model', () => {
      resolve()
    })
  })
  Promise.all([promise1, promise2]).then(() => {
    self.dispatch.call('load')
  })
}
Model.prototype.getAnimations = function () {
  if (!this.animations) {
    return null
  }
  var names = []
  this.animations.forEach(function (n) {
    names.push(n.name)
  })
  return names
}

Model.prototype.getAnimation = function (name) {
  var self = this,
    i,
    animIndex = -1
  if (!self.animations) {
    return animIndex
  }
  name = name.toLowerCase()
  if (name == 'idle' || name == 'attack') {
    var anims = [],
      re = new RegExp(name + '[0-9]*')
    for (i = 0; i < self.animations.length; ++i) {
      if (self.animations[i].name.search(re) == 0) anims.push(i)
    }
    if (anims.length > 0) {
      animIndex = anims[0]
    }
  } else {
    for (i = 0; i < self.animations.length; ++i) {
      if (self.animations[i].name == name) {
        animIndex = i
        break
      }
    }
  }
  return animIndex
}

Model.prototype.setAnimation = function (name) {
  var self = this
  if (name == 'default') {
    self.setDefaultAnimation()
  } else {
    self.animName = name
    self.animTime = 0
    self.deltaTime = 0
    self.newAnimation = true
  }
}

Model.prototype.setAnimationOnce = function (name) {
  var self = this
  if (name == 'default') {
    self.setDefaultAnimation()
  } else {
    if (self.getAnimation(name) !== -1) {
      self.animName = name
      self.animCycle = false
      self.animTime = 0
      self.deltaTime = 0
      self.newAnimation = true
    }
  }
}

Model.prototype.setDefaultAnimation = function () {
  var self = this
  var animations = self.getAnimations()
  var flag = false
  for (let i in animations) {
    let t = animations[i]
    if (t == 'idle' || t == 'idle1' || t == 'idle01' || t == 'idle02') {
      self.setAnimation(t)
      flag = true
      break
    }
  }
  if (!flag) {
    for (let i in animations) {
      const t = animations[i]
      if (
        t == 'attack' ||
        t == 'attack1' ||
        t == 'attack01' ||
        t == 'attack02'
      ) {
        self.setAnimation(t)
        flag = true
        break
      }
    }
  }
}

Model.prototype.toggleAnimation = function () {
  var self = this
  self.animStatus = !self.animStatus
}

Model.prototype.update = function (time) {
  var self = this,
    i,
    j

  if (self.animTime == 0) {
    self.animTime = time
  }

  if (
    !self.animName ||
    !self.loaded ||
    !self.vertices ||
    !self.animations ||
    self.animations.length == 0
  ) {
    return
  }

  self.animIndex = self.getAnimation(self.animName)
  if (self.animIndex == -1) {
    // self.animIndex = 0;
    // self.animName = "idle";
  }
  var anim = self.animations[self.animIndex]

  if (self.animStatus) self.deltaTime = time - self.animTime
  else self.animTime = time - self.deltaTime

  if (self.deltaTime >= anim.duration) {
    self.animTime = time
    self.deltaTime = 0
    if (!self.animCycle && !self.newAnimation) {
      self.setDefaultAnimation()
      self.animCycle = true
      self.animTime = time
      self.animIndex = self.getAnimation(self.animName)
      self.deltaTime = time - self.animTime
      anim = self.animations[self.animIndex]
    }
  }

  if (self.animStatus) {
    var timePerFrame = 1e3 / anim.fps
    var r, frame
    if(self.setFrame == null) {
      frame = Math.floor(self.deltaTime / timePerFrame)
      r = (self.deltaTime % timePerFrame) / timePerFrame
    } else {
      frame = Math.floor(self.setFrame)
      r = self.setFrame - frame
    }
    var b
    if (self.version >= 1) {
      for (i = 0; i < self.bones.length; ++i) {
        b = self.bones[i]
        if (anim.lookup[b.name] !== undefined) {
          anim.bones[anim.lookup[b.name]].update(i, frame, r)
        } else if (
          self.baseAnim &&
          self.baseAnim.lookup[b.name] !== undefined
        ) {
          self.baseAnim.bones[self.baseAnim.lookup[b.name]].update(i, frame, r)
        } else {
          if (b.parent != -1) {
            AnimationBone.prototype.mulSlimDX(
              self.transforms[i],
              b.incrMatrix,
              self.transforms[b.parent]
            )
          } else {
            mat4.copy(self.transforms[i], b.incrMatrix)
          }
        }
      }
    } else {
      for (i = 0; i < anim.bones.length; ++i) {
        b = anim.bones[i]
        if (self.boneLookup[b.bone] !== undefined) {
          b.update(self.boneLookup[b.bone], frame, r)
        } else {
          var parentBone = anim.bones[i - 1]
          if (!parentBone) continue
          if (parentBone.index + 1 < self.transforms.length) {
            mat4.copy(
              self.transforms[parentBone.index + 1],
              self.transforms[parentBone.index]
            )
          }
          b.index = parentBone.index + 1
        }
      }
    }
    var numBones = Math.min(self.transforms.length, self.bones.length)
    for (i = 0; i < numBones; ++i) {
      AnimationBone.prototype.mulSlimDX(
        self.transforms[i],
        self.bones[i].baseMatrix,
        self.transforms[i]
      )
    }
    mat4.identity(self.tmpMat)
    var numVerts = self.vertices.length,
      vec = self.tmpVec,
      position = self.geometry.attributes.position.array,
      normal = self.geometry.attributes.normal.array,
      v,
      w,
      m,
      idx
    for (i = 0; i < numVerts; ++i) {
      v = self.vertices[i]
      idx = i * 3
      position[idx] = position[idx + 1] = position[idx + 2] = 0
      normal[idx] = normal[idx + 1] = normal[idx + 2] = 0
      for (j = 0; j < 4; ++j) {
        if (v.weights[j] > 0) {
          w = v.weights[j]
          m = anim.fps == 1 ? self.tmpMat : self.transforms[v.bones[j]]
          vec3.transformMat4(vec, v.position, m)
          position[idx] += vec[0] * w
          position[idx + 1] += vec[1] * w
          position[idx + 2] += vec[2] * w
          vec4.transformMat4(vec, v.normal, m)
          normal[idx] += vec[0] * w
          normal[idx + 1] += vec[1] * w
          normal[idx + 2] += vec[2] * w
        }
      }
    }
    self.geometry.attributes.position.needsUpdate = true
    self.geometry.attributes.normal.needsUpdate = true
  }
  if (self.newAnimation) {
    self.newAnimation = false
  }
}

Model.prototype.load = function () {
  var self = this
  var loader = new FileLoader()
  loader.setResponseType('arraybuffer')
  loader.load(self.meshUrl, function (buffer) {
    self.loadMesh(buffer)
  })
}

Model.prototype.loadMesh = function (buffer) {
  if (!buffer) {
    console.error('Bad buffer for DataView')
    return
  }
  var self = this,
    r = new DataView2(buffer),
    i,
    v,
    idx
  try {
    var magic = r.getUint32()
    if (magic != 604210091) {
      console.log('Bad magic value')
      return
    }
  } catch (err) {
    alert(
      'Model currently isn\'t loading! We\'re sorry and hope to have this fixed soon.'
    )
    console.log(err)
    return
  }
  self.version = r.getUint32()
  var animFile = r.getString()
  var textureFile = r.getString()
  if (animFile && animFile.length > 0) {
    var loader = new FileLoader()
    loader.setResponseType('arraybuffer')
    var animUrl = self.baseUrl + `models/${animFile}.lanim`
    loader.load(
      animUrl,
      function (buffer) {
        self.loadAnim(buffer)
        self.dispatch.call('loadAnim')
      },
      undefined,
      () => {
        self.dispatch.call('loadAnim')
      }
    )
  }
  if (self.enableTexture && textureFile && textureFile.length > 0) {
    self.texture = new Texture$1(
      self,
      self.baseUrl + `textures/${self.champion}/` + textureFile + '.png'
    )
  }
  var numMeshes = r.getUint32()
  if (numMeshes > 0) {
    self.meshes = new Array(numMeshes)
    for (i = 0; i < numMeshes; ++i) {
      var name = r.getString().toLowerCase()
      var vStart = r.getUint32()
      var vCount = r.getUint32()
      var iStart = r.getUint32()
      var iCount = r.getUint32()
      self.meshes[i] = {
        name: name,
        vStart: vStart,
        vCount: vCount,
        iStart: iStart,
        iCount: iCount,
      }
    }
  }
  var numVerts = r.getUint32()
  if (numVerts > 0) {
    self.vertices = new Array(numVerts)
    self.vbData = new Float32Array(numVerts * 8)
    var position = []
    var normal = []
    var uv = []
    for (i = 0; i < numVerts; ++i) {
      idx = i * 8
      self.vertices[i] = v = new Vertex(r)
      self.vbData[idx] = v.position[0]
      self.vbData[idx + 1] = v.position[1]
      self.vbData[idx + 2] = v.position[2]
      self.vbData[idx + 3] = v.normal[0]
      self.vbData[idx + 4] = v.normal[1]
      self.vbData[idx + 5] = v.normal[2]
      self.vbData[idx + 6] = v.u
      self.vbData[idx + 7] = v.v

      position.push(v.position[0], v.position[1], v.position[2])
      normal.push(v.normal[0], v.normal[1], v.normal[2])
      uv.push(v.u, v.v)
    }
    self.geometry.setAttribute(
      'position',
      new BufferAttribute(new Float32Array(position), 3)
    )
    self.geometry.setAttribute(
      'normal',
      new BufferAttribute(new Float32Array(normal), 3)
    )
    self.geometry.setAttribute(
      'uv',
      new BufferAttribute(new Float32Array(uv), 2)
    )
  }
  var numIndices = r.getUint32()
  if (numIndices > 0) {
    self.indices = new Array(numIndices)
    for (i = 0; i < numIndices; ++i) {
      self.indices[i] = r.getUint16()
    }
    self.geometry.setIndex(
      new BufferAttribute(new Uint16Array(self.indices), 1)
    )
  }
  var numBones = r.getUint32()
  if (numBones > 0) {
    self.transforms = new Array(numBones)
    self.bones = new Array(numBones)
    for (i = 0; i < numBones; ++i) {
      self.bones[i] = new Bone(self, i, r)
      if (self.boneLookup[self.bones[i].name] !== undefined) {
        self.bones[i].name = self.bones[i].name + '2'
      }
      self.boneLookup[self.bones[i].name] = i
      self.transforms[i] = new mat4.create()
    }
  }
  self.loaded = true
  self.dispatch.call('loadMesh')
}

Model.prototype.loadAnim = function (buffer) {
  if (!buffer) {
    console.error('Bad buffer for DataView')
    return
  }
  var self = this,
    r = new DataView2(buffer),
    i
  var magic = r.getUint32()
  if (magic != 604210092) {
    console.log('Bad magic value')
    return
  }
  var version = r.getUint32()
  if (version >= 2) {
    var compressedData = new Uint8Array(buffer, r.position)
    var data = null
    try {
      data = inflate(compressedData)
    } catch (err) {
      console.log('Decompression error: ' + err)
      return
    }
    r = new DataView2(data.buffer)
  }
  var numAnims = r.getUint32()
  if (numAnims > 0) {
    self.animations = new Array(numAnims)
    for (i = 0; i < numAnims; ++i) {
      self.animations[i] = new Animation(self, r, version)
    }
  }
  self.animsLoaded = true
}

Model.prototype.on = function (eventName, callback) {
  this.dispatch.on(eventName, callback)
}

/**
 * LOLLoader
 * @author tengge / https://github.com/tengge1
 */
export default function LOLLoader() {
  // BaseLoader.call(this);
}

// LOLLoader.prototype = Object.create(BaseLoader.prototype);
LOLLoader.prototype.constructor = LOLLoader

LOLLoader.prototype.load = function (champion, skin, options) {
  return new Promise((resolve, reject) => {
    var model = new Model({
      champion: champion,
      skin: parseInt(skin),
      enableTexture: options.enableTexture,
      setFrame: options.setFrame
    })
    model.load()
    model.on('load.LOLLoader', () => {
      if (model.animsLoaded) {
        resolve(model)
      } else {
        reject()
      }
    })
  })
}
