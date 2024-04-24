import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useRef } from 'react'
import { Color, ColorRepresentation, PointLight } from 'three'
import { GithubButton } from '../../Components'
import { useRoomData } from '../../provider/RoomDataProvider'
import ExitPortal from '../ExitPortal'
import Portal from '../Portal'
import Walls from '../Walls'
import { RoomProps } from '../interface'
import Champion from './Champion'
import Ground from './Ground'
import ControlPanel from './ControlPanel'
import DescriptionPanel from './DescriptionPanel'
import Intro from './Intro'
import OpenButton from '../../Components/OpenButton'

const NAME = 'LolRoom'

const COLOR: ColorRepresentation = new Color(0x326196) // Darkblue rgb: 3, 10, 18
const FALLBACK_COLOR: ColorRepresentation = COLOR
const GOLD: ColorRepresentation = new Color(0x8c6e3a)

const GITHUB_WINLC = 'https://github.com/justabayet/whenisnextlolclash'
const SITE_WINLC = 'https://whenisnextlolclash.justabayet.com/'

const GITHUB_LSC = 'https://github.com/justabayet/LoLSceneCreator'
const SITE_LSC = 'https://lsc.justabayet.com/'

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
        <Champion />
        <Ground />
      </object3D>

      <GithubButton url={GITHUB_WINLC} position={[-0.7, 0.37, -0.4]} scale={0.7} rotation={[0, Math.PI * 0.2, 0]} />
      <OpenButton url={SITE_WINLC} text='example site' position={[-0.7, 0.17, -0.4]} scale={0.7} rotation={[0, Math.PI * 0.2, 0]} />
      <DescriptionPanel position={[0, 0.3, -0.5]} rotation={[0, 0, 0]} />
      <GithubButton url={GITHUB_LSC} position={[0.7, 0.5, -0.5]} scale={0.7} rotation={[0, - Math.PI * 0.2, 0]} />
      <OpenButton url={SITE_LSC} text='Creator' position={[0.7, 0.3, -0.5]} scale={0.7} rotation={[0, - Math.PI * 0.2, 0]} />

      <ControlPanel position={[1, 0.2, -0.1]} rotation={[0, -Math.PI * 0.4, 0]} scale={0.5} />

      <Walls color={COLOR} />

      {isDisplayed && <ExitPortal position={[0, 0, 8.9]} />}
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