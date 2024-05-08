import inflate from './process'
import { Dispatch, dispatch } from 'd3-dispatch'
import { mat4, vec3, vec4 } from 'gl-matrix'
import { FileLoader } from 'three/src/loaders/FileLoader.js'
import { BufferGeometry } from 'three/src/core/BufferGeometry.js'
import { BufferAttribute } from 'three/src/core/BufferAttribute.js'
import { MeshPhongMaterial } from 'three/src/materials/MeshPhongMaterial.js'
import { Animation } from './animation'
import { DataViewCustom } from './dataViewCustom'
import { AnimationBone } from './animationBone'
import { Bone } from './bone'
import { Vertex } from './vertex'
import { TextureCustom } from './textureCustom'


type DispatchEvent = 'load' | 'loadMesh' | 'loadTexture' | 'loadAnim'

interface MeshData {
  name: string
  vStart: number
  vCount: number
  iStart: number
  iCount: number
}

export interface ModelOptions {
  champion: string
  skin: number
  animation?: string
  setFrame?: number
  enableTexture?: boolean
}

export class Model {
  champion: string
  skin: number
  baseUrl: string
  meshUrl: string
  setFrame?: number
  loaded: boolean
  animsLoaded: boolean
  meshes: MeshData[] | null = null
  vertices: Vertex[] | null = null
  indices: number[] | null = null
  transforms: mat4[] | null = null
  bones: Bone[] | null = null
  boneLookup: Record<string, number>
  enableTexture: boolean
  animIndex: number
  animName: string | null
  newAnimation: boolean
  animCycle: boolean
  animTime: number
  deltaTime: number
  tmpMat: mat4
  tmpVec: vec4
  animStatus: boolean
  dispatch: Dispatch<Record<string, never>>
  ambientColor: number[]
  primaryColor: number[]
  secondaryColor: number[]
  lightDir1: vec3
  lightDir2: vec3
  lightDir3: vec3
  texture: TextureCustom | null
  geometry: BufferGeometry
  material: MeshPhongMaterial
  animations: Animation[] | null = null
  version: number | null = null
  vbData: Float32Array | null = null
  startAnimation?: string
  
  constructor(options: ModelOptions) {
    this.champion = options.champion || '1'
    this.skin = options.skin || 0
    this.startAnimation = options.animation
    this.baseUrl = 'https://lolking-models.justabayet.com/'
    this.meshUrl = this.baseUrl + `models/${this.champion}_${this.skin}.lmesh`
  
    this.setFrame = options.setFrame
  
    this.loaded = false
    this.animsLoaded = false
  
    this.meshes = null
    this.vertices = null
    this.indices = null
    this.transforms = null
    this.bones = null
    this.boneLookup = {}
    this.enableTexture = options.enableTexture != null ? options.enableTexture: true
    this.animIndex = -1
    this.animName = null
    this.newAnimation = false
    this.animCycle = true
    this.animTime = 0
    this.deltaTime = 0
    this.tmpMat = mat4.create()
    this.tmpVec = vec4.create()
    this.animStatus = true
  
    this.dispatch = dispatch('load', 'loadMesh', 'loadTexture', 'loadAnim')
  
    this.ambientColor = [0.35, 0.35, 0.35, 1]
    this.primaryColor = [1, 1, 1, 1]
    this.secondaryColor = [0.35, 0.35, 0.35, 1]
    this.lightDir1 = vec3.create()
    this.lightDir2 = vec3.create()
    this.lightDir3 = vec3.create()
    vec3.normalize(this.lightDir1, [5, 5, -5])
    vec3.normalize(this.lightDir2, [5, 5, 5])
    vec3.normalize(this.lightDir3, [-5, -5, -5])
  
    this.texture = null
    this.geometry = new BufferGeometry()
    this.material = new MeshPhongMaterial()
  
    const promiseLoadMesh = new Promise<void>((resolve) => {
      this.dispatch.on('loadMesh.Model', () => {
        resolve()
      })
    })
    const promiseLoadAnim = new Promise<void>((resolve) => {
      this.dispatch.on('loadAnim.Model', () => {
        resolve()
      })
    })
    Promise.all([promiseLoadMesh, promiseLoadAnim]).then(() => {
      if(this.startAnimation) this.setAnimation(this.startAnimation)
      this.dispatch.call('load')
    })
  }

  getAnimations() {
    if (!this.animations) {
      return null
    }
    const names: string[] = []
    this.animations.forEach(function (n) {
      names.push(n.name)
    })
    return names
  }

  getAnimation(name: string) {
    let animIndex = -1
    if (!this.animations) {
      return animIndex
    }
    name = name.toLowerCase()
    if (name == 'idle' || name == 'attack') {
      const anims = [],
        re = new RegExp(name + '[0-9]*')
      for (let i = 0; i < this.animations.length; ++i) {
        if (this.animations[i].name.search(re) == 0) anims.push(i)
      }
      if (anims.length > 0) {
        animIndex = anims[0]
      }
    } else {
      for (let i = 0; i < this.animations.length; ++i) {
        if (this.animations[i].name == name) {
          animIndex = i
          break
        }
      }
    }
    return animIndex
  }

  setAnimation(name: string) {
    if (name == 'default') {
      this.setDefaultAnimation()
    } else {
      this.animName = name
      this.animTime = 0
      this.deltaTime = 0
      this.newAnimation = true
    }
    this.update(0)
  }

  setAnimationOnce(name: string) {
    if (name == 'default') {
      this.setDefaultAnimation()
    } else {
      if (this.getAnimation(name) !== -1) {
        this.animName = name
        this.animCycle = false
        this.animTime = 0
        this.deltaTime = 0
        this.newAnimation = true
      }
    }
  }

  setDefaultAnimation() {
    const animations = this.getAnimations()
    let flag = false
    for (const animation in animations) {
      if (animation == 'idle' || animation == 'idle1' || animation == 'idle01' || animation == 'idle02') {
        this.setAnimation(animation)
        flag = true
        break
      }
    }
    if (!flag) {
      for (const animation in animations) {
        if (
          animation == 'attack' ||
          animation == 'attack1' ||
          animation == 'attack01' ||
          animation == 'attack02'
        ) {
          this.setAnimation(animation)
          flag = true
          break
        }
      }
    }
  }

  toggleAnimation() {
    this.animStatus = !this.animStatus
  }

  update(time: number) {
    if (this.animTime == 0) {
      this.animTime = time
    }

    if (
      !this.animName ||
      !this.loaded ||
      !this.vertices ||
      !this.animations ||
      !this.bones ||
      !this.transforms ||
      this.animations.length == 0
    ) {
      return
    }

    this.animIndex = this.getAnimation(this.animName)
    if (this.animIndex == -1) {
      // this.animIndex = 0;
      // this.animName = "idle";
    }
    let anim = this.animations[this.animIndex]

    if (this.animStatus) this.deltaTime = time - this.animTime
    else this.animTime = time - this.deltaTime

    if (this.deltaTime >= anim.duration) {
      this.animTime = time
      this.deltaTime = 0
      if (!this.animCycle && !this.newAnimation) {
        this.setDefaultAnimation()
        this.animCycle = true
        this.animTime = time
        this.animIndex = this.getAnimation(this.animName)
        this.deltaTime = time - this.animTime
        anim = this.animations[this.animIndex]
      }
    }

    if (this.animStatus) {
      const timePerFrame = 1e3 / anim.fps
      let r, frame
      if(this.setFrame == null) {
        frame = Math.floor(this.deltaTime / timePerFrame)
        r = (this.deltaTime % timePerFrame) / timePerFrame
      } else {
        frame = Math.floor(this.setFrame)
        r = this.setFrame - frame
      }
      if (this.version && this.version >= 1) {
        for (let i = 0; i < this.bones.length; ++i) {
          const b = this.bones[i]
          if (anim.lookup[b.name] !== undefined) {
            anim.bones[anim.lookup[b.name]].update(i, frame, r)
          } else {
            if (b.parent != -1) {
              AnimationBone.prototype.mulSlimDX(
                this.transforms[i],
                b.incrMatrix,
                this.transforms[b.parent]
              )
            } else {
              mat4.copy(this.transforms[i], b.incrMatrix)
            }
          }
        }
      } else {
        for (let i = 0; i < anim.bones.length; ++i) {
          const b = anim.bones[i]
          if (this.boneLookup[b.bone] !== undefined) {
            b.update(this.boneLookup[b.bone], frame, r)
          } else {
            const parentBone = anim.bones[i - 1]
            if (!parentBone) continue
            const parentBoneIndex = parentBone.index!
            if (parentBoneIndex + 1 < this.transforms.length) {
              mat4.copy(
                this.transforms[parentBoneIndex + 1],
                this.transforms[parentBoneIndex]
              )
            }
            b.index = parentBoneIndex + 1
          }
        }
      }
      const numBones = Math.min(this.transforms.length, this.bones.length)
      for (let i = 0; i < numBones; ++i) {
        AnimationBone.prototype.mulSlimDX(
          this.transforms[i],
          this.bones[i].baseMatrix,
          this.transforms[i]
        )
      }
      mat4.identity(this.tmpMat)
      const vec = this.tmpVec
      const numVerts = this.vertices.length
      const position = this.geometry.attributes.position.array
      const normal = this.geometry.attributes.normal.array
      let v,
        w,
        m,
        idx
      for (let i = 0; i < numVerts; ++i) {
        v = this.vertices[i]
        idx = i * 3
        position[idx] = position[idx + 1] = position[idx + 2] = 0
        normal[idx] = normal[idx + 1] = normal[idx + 2] = 0
        for (let j = 0; j < 4; ++j) {
          if (v.weights[j] > 0) {
            w = v.weights[j]
            m = anim.fps == 1 ? this.tmpMat : this.transforms[v.bones[j]]
            vec3.transformMat4(vec as vec3, v.position, m)
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
      this.geometry.attributes.position.needsUpdate = true
      this.geometry.attributes.normal.needsUpdate = true
    }
    if (this.newAnimation) {
      this.newAnimation = false
    }
  }

  load() {
    const loader = new FileLoader()
    loader.setResponseType('arraybuffer')
    loader.load(this.meshUrl, (buffer) => {
      this.loadMesh(buffer as unknown as ArrayBuffer)
    })
  }

  loadMesh(buffer: ArrayBufferLike & { BYTES_PER_ELEMENT?: undefined }) {
    if (!buffer) {
      console.error('Bad buffer for DataView')
      return
    }
    const r = new DataViewCustom(buffer)
      
    let v,
      idx
    try {
      const magic = r.getUint32()
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
    this.version = r.getUint32()
    const animFile = r.getString()
    const textureFile = r.getString()
    if (animFile && animFile.length > 0) {
      const loader = new FileLoader()
      loader.setResponseType('arraybuffer')
      const animUrl = this.baseUrl + `models/${animFile}.lanim`
      loader.load(
        animUrl,
        (buffer) => {
          this.loadAnim(buffer as unknown as ArrayBuffer)
        },
        undefined,
        () => {
          this.dispatch.call('loadAnim')
        }
      )
    }
    if (this.enableTexture && textureFile && textureFile.length > 0) {
      this.texture = new TextureCustom(
        this,
        this.baseUrl + `textures/${this.champion}/` + textureFile + '.png'
      )
    }
    const numMeshes = r.getUint32()
    if (numMeshes > 0) {
      this.meshes = new Array(numMeshes)
      for (let i = 0; i < numMeshes; ++i) {
        const name = r.getString().toLowerCase()
        const vStart = r.getUint32()
        const vCount = r.getUint32()
        const iStart = r.getUint32()
        const iCount = r.getUint32()
        this.meshes[i] = {
          name,
          vStart,
          vCount,
          iStart,
          iCount,
        }
      }
    }
    const numVerts = r.getUint32()
    if (numVerts > 0) {
      this.vertices = new Array(numVerts)
      this.vbData = new Float32Array(numVerts * 8)
      const position = []
      const normal = []
      const uv = []
      for (let i = 0; i < numVerts; ++i) {
        idx = i * 8
        this.vertices[i] = v = new Vertex(r)
        this.vbData[idx] = v.position[0]
        this.vbData[idx + 1] = v.position[1]
        this.vbData[idx + 2] = v.position[2]
        this.vbData[idx + 3] = v.normal[0]
        this.vbData[idx + 4] = v.normal[1]
        this.vbData[idx + 5] = v.normal[2]
        this.vbData[idx + 6] = v.u
        this.vbData[idx + 7] = v.v

        position.push(v.position[0], v.position[1], v.position[2])
        normal.push(v.normal[0], v.normal[1], v.normal[2])
        uv.push(v.u, v.v)
      }
      this.geometry.setAttribute(
        'position',
        new BufferAttribute(new Float32Array(position), 3)
      )
      this.geometry.setAttribute(
        'normal',
        new BufferAttribute(new Float32Array(normal), 3)
      )
      this.geometry.setAttribute(
        'uv',
        new BufferAttribute(new Float32Array(uv), 2)
      )
    }
    const numIndices = r.getUint32()
    if (numIndices > 0) {
      this.indices = new Array(numIndices)
      for (let i = 0; i < numIndices; ++i) {
        this.indices[i] = r.getUint16()
      }
      this.geometry.setIndex(
        new BufferAttribute(new Uint16Array(this.indices), 1)
      )
    }
    const numBones = r.getUint32()
    if (numBones > 0) {
      this.transforms = new Array(numBones)
      this.bones = new Array(numBones)
      for (let i = 0; i < numBones; ++i) {
        this.bones[i] = new Bone(this, i, r)
        if (this.boneLookup[this.bones[i].name] !== undefined) {
          this.bones[i].name = this.bones[i].name + '2'
        }
        this.boneLookup[this.bones[i].name] = i
        this.transforms[i] = mat4.create()
      }
    }
    this.loaded = true
    this.dispatch.call('loadMesh')
  }

  loadAnim(buffer: ArrayBufferLike & { BYTES_PER_ELEMENT?: undefined }) {
    if (!buffer) {
      console.error('Bad buffer for DataView')
      return
    }

    let r = new DataViewCustom(buffer)
    const magic = r.getUint32()
    if (magic != 604210092) {
      console.log('Bad magic value')
      return
    }

    const generateAnimations = () => {
      const numAnims = r.getUint32()
      if (numAnims > 0) {
        this.animations = new Array(numAnims)
        for (let i = 0; i < numAnims; ++i) {
          if(i !== 0) continue // To remove
          this.animations[i] = new Animation(this, r, version)
        }
      }
      this.dispatch.call('loadAnim')
      this.animsLoaded = true
    }

    const version = r.getUint32()
    if (version >= 2) {
      try {
        const compressedData = new Uint8Array(buffer, r.position)
        inflate(compressedData, (data) => {
          r = new DataViewCustom(data.buffer)
          generateAnimations()
        })
      } catch (err) {
        console.log('Decompression error: ' + err)
        return
      }
    } else {
      generateAnimations()
    }
  }

  on(eventName: DispatchEvent, callback: () => void) {
    this.dispatch.on(eventName, callback)
  }
}