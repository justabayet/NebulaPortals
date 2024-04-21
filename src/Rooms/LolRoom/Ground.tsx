import { useLoader } from '@react-three/fiber'
import { DoubleSide, MeshPhongMaterial, TextureLoader } from 'three'
import ground from './assets/bg.png'

function Ground() {
  const texture = useLoader(TextureLoader, ground)

  const material = new MeshPhongMaterial({
    depthWrite: true,
    map: texture,
    side: DoubleSide
  })

  return (
    <mesh rotation-x={-Math.PI / 2} receiveShadow material={material}>
      <circleGeometry args={[0.5, 50]} />
    </mesh>
  )
}

export default Ground
