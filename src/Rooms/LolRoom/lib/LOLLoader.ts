import { Loader, LoadingManager } from 'three'
import { Model, ModelOptions } from './model'

type Urls = '266/0/idle3_base'

type ModelLoaderOptions = ModelOptions & { anim: string }

const options: Record<Urls, ModelLoaderOptions> = {
  '266/0/idle3_base': {
    champion: '266',
    skin: 0,
    anim: 'idle3_base'
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
    const { champion, skin, anim } = options[url]
    
    const model = new Model({ champion, skin })
    model.load()

    model.on('load', () => {
      if (model.animsLoaded) {
        model.setAnimation(anim)
        model.update(0)
        onLoad(model)
      }
    })
  }
}
