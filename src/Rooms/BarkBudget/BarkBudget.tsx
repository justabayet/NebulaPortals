import { Euler, Mesh, Object3D } from 'three'
import { Object3DProps, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { easing } from 'maath'

import useIsActive from '../../hooks/useIsActive'
import Walls from '../Walls'
import Door from '../Door'
import ExitPortal from '../ExitPortal'
import { RoomProps } from '../DefaultContent'
import Panel from '../Panel'
import Image from '../Image'
import GithubButton from '../GithubButton'

import { button, description, google_button, graph, home, login, logo_light, record, tabs, white_background } from './assets'

function Login(props: Object3DProps): JSX.Element {
  return (
    <object3D {...props}>
      <Image src={login} size={1.1} />
      <Image src={google_button} position={[0, -0.3, 0.2]} size={0.2} radius={0.4} />
    </object3D>
  )
}

function DescriptionPanel(props: Object3DProps): JSX.Element {
  return (
    <object3D {...props}>
      <Image src={description} position={[0, 0, 0.1]} radius={0.05} />
      <Image src={white_background} position={[0, 0, -0.1]} size={1.1} />
    </object3D>
  )
}

function HomePage(props: Object3DProps): JSX.Element {
  return (
    <object3D {...props}>
      <Image src={home} position={[0, 0, 0]} hoverable={true} />
      <Image src={graph} position={[0, 0.57, 0.2]} size={0.85} />

      <Image src={record} position={[0, 0.2, 0.1]} size={0.9} radius={0.06} />
      <Image src={record} position={[0, 0, 0.1]} size={0.9} radius={0.06} />
      <Image src={record} position={[0, -0.2, 0.1]} size={0.9} radius={0.06} />

      <Image src={button} position={[0.3, -0.62, 0.25]} size={0.2} radius={0.5} />
      <Image src={tabs} position={[0, -0.9, 0.1]} size={0.9} radius={0.06} />
    </object3D>
  )
}

interface IntroProps extends Object3DProps {
  color: string
}

function Intro({ color, ...props }: IntroProps): JSX.Element {
  const isActive = useIsActive()

  const backgroundRef = useRef<Mesh>(null)
  const graphRef = useRef<Object3D>(null)
  useFrame((_, dt) => {
    if (backgroundRef.current != null) {
      easing.damp(backgroundRef.current.position, 'y', isActive ? -3 : 0, 0.3, dt)
    }
    if (graphRef.current != null) {
      easing.damp(graphRef.current.position, 'y', isActive ? 2.5 : 0.9, 0.3, dt)
    }
  })

  return (
    <object3D {...props}>
      <Image src={logo_light} position={[0, 0, 0]} size={1.5} />

      <object3D ref={graphRef} position={[0.2, 0.9, -0.3]} rotation={new Euler(Math.PI / 5, 0, -Math.PI / 10)}>
        <Image src={graph} size={1} />
      </object3D>

      <pointLight
        intensity={2}
        position={[0, 0, -0.3]} />

      <Panel
        ref={backgroundRef}
        position={[0, 0, -1]}
        width={10}
        height={1.5}
        color={color} />
    </object3D>
  )
}

function BarkBudget_(): JSX.Element {
  const COLOR = 'white'
  const GITHUB = 'https://github.com/justabayet/BarkBudget'

  const isActive = useIsActive()

  const panelRef = useRef<Object3D>(null)
  useFrame((_, dt) => {
    if (panelRef.current == null) return
    easing.damp(panelRef.current.position, 'y', isActive ? 0 : -4, 0.3, dt)
  })

  return (
    <object3D position={[0, 0, -3]}>
      <ambientLight intensity={0.2} />
      <pointLight
        intensity={5}
        position={[0, 0, 0]} />

      <Intro color={COLOR} position={[0, 0, 2.5]} />

      <object3D ref={panelRef} position={[0, 0, 0]}>
        <Login position={[-1, 0, -0.4]} rotation={new Euler(0, Math.PI / 3, 0)} />

        <HomePage position={[0, 0, -1.1]} />
        <GithubButton url={GITHUB} position={[0, -1.2, -0.9]} scale={1.6} rotation={new Euler(-Math.PI / 3, 0, 0)} />

        <DescriptionPanel position={[1, 0, -0.4]} rotation={new Euler(0, -Math.PI / 3, 0)} />
      </object3D>

      <Walls color={COLOR} />

      {isActive && <ExitPortal position={[0, 0, 8.9]} />}
    </object3D>
  )
}

function BarkBudget({ position, index }: RoomProps): JSX.Element {
  return (
    <Door position={position} name={'BarkBudget'} index={index}>
      <BarkBudget_ />
    </Door>
  )
}

export default BarkBudget