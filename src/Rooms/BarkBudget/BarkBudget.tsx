import { Color, ColorRepresentation, Object3D } from 'three'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { easing } from 'maath'

import Walls from '../Walls'
import ExitPortal from '../ExitPortal'

import { useRoomData } from '../../provider/RoomDataProvider'
import DescriptionPanel from './DescriptionPanel'
import HomePage from './HomePage'
import Intro from './Intro'
import Login from './Login'
import Portal from '../Portal'
import { RoomProps } from '../interface'
import { ButtonGithub, ButtonOpen } from '../../Components'

const NAME = 'BarkBudget'
const COLOR: ColorRepresentation = 'white'
const FALLBACK_COLOR: ColorRepresentation = new Color('rgb(207, 207, 207)')
const GITHUB = 'https://github.com/justabayet/BarkBudget'
const SITE = 'https://bb.justabayet.com/'

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
        <ButtonGithub url={GITHUB} position={[-0.2, -1.2, -0.9]} scale={2} rotation={[-Math.PI / 3, 0, 0]} />
        <ButtonOpen url={SITE} text='BarkBudget site' position={[0.2, -1.2, -0.9]} scale={2} rotation={[-Math.PI / 3, 0, 0]} />

        <DescriptionPanel position={[1, 0, -0.4]} rotation={[0, -Math.PI / 3, 0]} />
      </object3D>

      <Walls color={COLOR} />

      <ExitPortal position={[0, 0, 8.9]} isVisible={isDisplayed} />
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