import { Texture } from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'
import { Model } from './model'

export class TextureCustom {
  model: Model
  url: string
  texture: Texture | null
  
  constructor(model: Model, url: string) {
    this.model = model
    this.url = url
    this.texture = null
    this.load()
  }

  load() {
    this.texture = new TextureLoader().load(this.url, (texture) => {
      this.onLoad.call(this, texture)
    })
  }

  onLoad(texture: Texture) {
    texture.flipY = false
    this.model.material.map = texture
    this.model.material.needsUpdate = true
  
    this.model.dispatch.call('loadTexture')
  }
}