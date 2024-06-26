import { Object3DProps, useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useRef } from 'react'
import { Mesh, Object3D, FrontSide, ColorRepresentation, BackSide } from 'three'
import { logo_dark, logo_light } from './assets'
import { Image } from '../../Components'
import { useRoomData } from '../../provider/RoomDataProvider'

interface IntroProps extends Object3DProps {
  color: ColorRepresentation
}

function Intro({ ...props }: IntroProps): JSX.Element {
  const { isActive } = useRoomData()

  const backgroundRef = useRef<Mesh>(null)
  const graphRef = useRef<Object3D>(null)
  useFrame((_, dt) => {
    if (backgroundRef.current != null) {
      if (isActive) {
        easing.damp(backgroundRef.current.position, 'y', -6, 0.01, dt)
      } else {
        easing.damp(backgroundRef.current.position, 'y', 0, 0.5, dt)
      }
    }
    if (graphRef.current != null) {
      easing.damp(graphRef.current.position, 'y', isActive ? 1.5 : 0.9, 0.5, dt)
    }
  })

  return (
    <object3D {...props}>
      <Image src={logo_dark} position={[0, 0, 0]} size={1.5} isBasicMaterial side={FrontSide} />
      <Image src={logo_light} position={[0, 0, -0.001]} size={1.5} isBasicMaterial side={BackSide} />

      <mesh ref={backgroundRef}
        position={[0, 0, -1]}>
        <planeGeometry args={[3, 4]} />
        <meshBasicMaterial side={FrontSide} color={0xcccccc} />
      </mesh>
    </object3D>
  )
}

export default Intro