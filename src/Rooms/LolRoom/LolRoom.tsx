import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { Suspense, useRef } from 'react'
import { Color, ColorRepresentation, PointLight } from 'three'
import { useRoomData } from '../../provider/RoomDataProvider'
import ExitPortal from '../ExitPortal'
import Portal from '../Portal'
import Walls from '../Walls'
import { RoomProps } from '../interface'
import Champion from './Champion'
import Ground from './Ground'
import ControlPanel from './ControlPanel'
import Intro from './Intro'
import LinkWINLC from './LinkWINLC'
import LinkCreator from './LinkCreator'

const NAME = 'LolRoom'

const COLOR: ColorRepresentation = new Color(0x326196) // Darkblue rgb: 3, 10, 18
const FALLBACK_COLOR: ColorRepresentation = new Color('rgb(0, 5, 40)')
const GOLD: ColorRepresentation = new Color(0x8c6e3a)

function LolRoom(): JSX.Element {
  const { isDisplayed, isActive } = useRoomData()

  const lightRef = useRef<PointLight>(null)
  useFrame((_, dt) => {
    if (lightRef.current != null) {
      easing.damp(lightRef.current, 'intensity', isActive ? 4 : 0, 1.5, dt)
    }
  })

  return (
    <object3D position={[0, 0, -3]}>
      <ambientLight intensity={0.2} />
      <pointLight
        ref={lightRef}
        intensity={4}
        position={[0, 1, 1]} castShadow />

      <Intro position={[0, 0, 2.5]} />

      <object3D position={[0, -0.4, 0]}>
        <Suspense>
          <Champion />
        </Suspense>
        <Ground />
      </object3D>

      <LinkCreator position={[0, 0.5, -0.5]} />
      <LinkWINLC position={[-1, 0.2, 0]} rotation={[0, Math.PI * 0.4, 0]} />

      <ControlPanel position={[1, 0.2, -0.1]} rotation={[0, -Math.PI * 0.4, 0]} scale={0.5} />

      <Walls color={COLOR} />

      <ExitPortal position={[0, 0, 8.9]} isVisible={isDisplayed} />
    </object3D>
  )
}

function WrappedLolRoom(props: RoomProps): JSX.Element {
  return (
    <Portal name={NAME} fallbackColor={FALLBACK_COLOR} border={{ color: GOLD }} {...props}>
      <LolRoom />
    </Portal>
  )
}

export default WrappedLolRoom