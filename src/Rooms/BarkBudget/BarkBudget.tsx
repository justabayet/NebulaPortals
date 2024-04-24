import { ColorRepresentation, Object3D } from 'three'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { easing } from 'maath'

import Walls from '../Walls'
import ExitPortal from '../ExitPortal'
import { GithubButton } from '../../Components'

import { useRoomData } from '../../provider/RoomDataProvider'
import DescriptionPanel from './DescriptionPanel'
import HomePage from './HomePage'
import Intro from './Intro'
import Login from './Login'
import Portal from '../Portal'
import { RoomProps } from '../interface'

const NAME = 'BarkBudget'
const COLOR: ColorRepresentation = 'white'
const FALLBACK_COLOR: ColorRepresentation = 'grey'
const GITHUB = 'https://github.com/justabayet/BarkBudget'

function BarkBudget(): JSX.Element {
  const { isDisplayed, isActive } = useRoomData()

  const panelGroupRef = useRef<Object3D>(null)
  useFrame((_, dt) => {
    if (panelGroupRef.current == null) return
    easing.damp(panelGroupRef.current.position, 'y', isActive ? 0 : -4, 0.3, dt)
  })

  return (
    <object3D position={[0, 0, -3]}>
      <ambientLight intensity={0.2} />
      <pointLight
        intensity={5}
        position={[0, 0, 0]} />

      <Intro color={COLOR} position={[0, 0, 2.5]} />

      <object3D ref={panelGroupRef} position={[0, 0, 0]}>
        <Login position={[-1, 0, -0.4]} rotation={[0, Math.PI / 3, 0]} />

        <HomePage position={[0, 0, -1.1]} />
        <GithubButton url={GITHUB} position={[0, -1.2, -0.9]} scale={1.6} rotation={[-Math.PI / 3, 0, 0]} />

        <DescriptionPanel position={[1, 0, -0.4]} rotation={[0, -Math.PI / 3, 0]} />
      </object3D>

      <Walls color={COLOR} />

      {isDisplayed && <ExitPortal position={[0, 0, 8.9]} />}
    </object3D>
  )
}

function WrappedBarkBudget(props: RoomProps): JSX.Element {
  return (
    <Portal name={NAME} fallbackColor={FALLBACK_COLOR} {...props}>
      <BarkBudget />
    </Portal>
  )
}

export default WrappedBarkBudget