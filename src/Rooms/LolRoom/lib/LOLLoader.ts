import { Loader, LoadingManager } from 'three'
import { Model, ModelOptions } from './model'

type Urls = '266/0/idle3_base'

type ModelLoaderOptions = ModelOptions

const options: Record<Urls, ModelLoaderOptions> = {
  '266/0/idle3_base': {
    champion: '266',
    skin: 0,
    animation: 'idle3_base'
  }
}

/**
 * Original project: @author tengge / https://github.com/tengge1
 */
export default class LOLLoader extends Loader<Model> {
  constructor(manager?: LoadingManager) {
    super(manager)
  }

  load(url: Urls, onLoad: (data: Model) => void) {
    const { champion, skin, animation } = options[url]
    
    const model = new Model({ champion, skin, animation })
    model.load()

    model.on('load', () => {
      onLoad(model)
    })
  }
}
