import { Model, ModelOptions } from './model'

type LoaderOptions = Omit<ModelOptions, 'champion' | 'skin'>

/**
 * LOLLoader
 * @author tengge / https://github.com/tengge1
 */
export default class LOLLoader {
  constructor() {}

  load(champion: string, skin: number, options: LoaderOptions) {
    return new Promise<Model>((resolve, reject) => {
      const model = new Model({
        champion,
        skin,
        ...options
      })
      model.load()
      model.on('load', () => {
        if (model.animsLoaded) {
          resolve(model)
        } else {
          reject()
        }
      })
    })
  }
}
