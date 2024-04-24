import { Object3DProps, useFrame } from '@react-three/fiber'
import { Image } from '../../Components'
import logo from './assets/logo.png'
import { FrontSide, Object3D } from 'three'
import { easing } from 'maath'
import { useRef } from 'react'
import { useRoomData } from '../../provider/RoomDataProvider'

function Intro(props: Object3DProps): JSX.Element {
  const { isActive } = useRoomData()

  const ref = useRef<Object3D>(null)

  useFrame((_, dt) => {
    if (ref.current != null) {
      easing.damp(ref.current.position, 'y', isActive ? 1.5 : 0, 0.5, dt)
    }
  })

  return (
    <object3D {...props} ref={ref}>
      <Image src={logo} position={[0, 0, -0.1]} size={1.1} side={FrontSide} isBasicMaterial radius={0.45} />
    </object3D>
  )
}

export default Intro