import { Euler, Vector3 } from 'three'
import { suspend } from 'suspend-react'

interface ChampionConfig {
  championKey: string
  skinIndex: number
  position: Vector3
  rotation: Euler
  animName: string
}

const aatroxConfig: ChampionConfig = {
  championKey: '266',
  skinIndex: 0,
  position: new Vector3(0, 0, 0),
  rotation: new Euler(0, 0.7, 0),
  animName: 'idle3_base'
}

function Champion() {
  const { championKey, skinIndex, animName, position, rotation } = aatroxConfig

  const model = suspend(async () => {
    const { default: LOLLoader } = await import('./lib/LOLLoader')
    const loader = new LOLLoader()

    const model = await loader.load(championKey, skinIndex, { enableTexture: true, animName })

    model.setAnimation(animName)
    model.update(0)

    return model
  }, [animName, championKey, skinIndex])

  return (
    <mesh
      scale={0.002}
      position={position}
      rotation={rotation}
      material={model.material}
      geometry={model.geometry}
      receiveShadow
      castShadow
    />
  )
}


export default Champion
