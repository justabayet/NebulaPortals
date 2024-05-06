import { MeshProps, useLoader } from '@react-three/fiber'
import LOLLoader from './lib/LOLLoader'

function Champion({ position, rotation }: MeshProps) {
  const model = useLoader(LOLLoader, '266/0/idle3_base')

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
