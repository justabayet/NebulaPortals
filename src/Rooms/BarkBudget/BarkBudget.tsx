import { Euler, FrontSide, Mesh, Object3D, Vector3 } from 'three'
import { Object3DProps, useFrame } from '@react-three/fiber'
import { RefObject, useMemo, useRef } from 'react'
import { easing } from 'maath'

import useIsActive from '../../hooks/useIsActive'
import Walls from '../Walls'
import Door from '../Door'
import ExitPortal from '../ExitPortal'
import { RoomProps } from '../DefaultContent'
import Image from '../Image'
import GithubButton from '../GithubButton'

import { button, description, google_button, graph, home, login, logo_dark, logo_light, record, tabs, white_background } from './assets'

function useAnimatedRotation(ref: RefObject<Object3D>) {
  const targetRotation = useMemo(() => new Vector3(), [])

  useFrame((_, dt) => {
    if (ref.current != null) {
      easing.damp(ref.current.rotation, 'x', targetRotation.x, 0.1, dt)
      easing.damp(ref.current.rotation, 'y', targetRotation.y, 0.1, dt)
      easing.damp(ref.current.rotation, 'z', targetRotation.z, 0.1, dt)
    }
  })

  return targetRotation
}

function Login(props: Object3DProps): JSX.Element {
  const ref = useRef<Object3D>(null)

  const targetRotation = useAnimatedRotation(ref)

  return (
    <object3D {...props}>
      <object3D ref={ref} >

        <Image src={login} size={1.1} hoverable={true}
          onPointerMove={(e) => {
            if (e.uv == null) return
            targetRotation.y = (e.uv.x - 0.5) * 0.3
            targetRotation.x = -(e.uv.y - 0.5) * 0.2
          }}
          onPointerOut={() => {
            targetRotation.y = 0
            targetRotation.x = 0
          }} />
        <Image src={google_button} position={[0, -0.3, 0.2]} size={0.2} radius={0.4} />
      </object3D>
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
  const ref = useRef<Object3D>(null)

  const targetRotation = useAnimatedRotation(ref)

  return (
    <object3D ref={ref} {...props}>
      <Image src={home} position={[0, 0, 0]} hoverable={true}
        onPointerMove={(e) => {
          if (e.uv == null) return
          targetRotation.y = (e.uv.x - 0.5) * 0.3
          targetRotation.x = -(e.uv.y - 0.5) * 0.2
        }}
        onPointerOut={() => {
          targetRotation.y = 0
          targetRotation.x = 0
        }} />
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

function Intro({ ...props }: IntroProps): JSX.Element {
  const isActive = useIsActive()

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
      easing.damp(graphRef.current.position, 'y', isActive ? 2.5 : 0.9, 0.3, dt)
    }
  })

  return (
    <object3D {...props}>
      <Image src={logo_dark} position={[0, 0, 0]} size={1.5} isBasicMaterial />
      <Image src={logo_light} position={[0, 0, -0.001]} size={1.5} isBasicMaterial />

      <object3D ref={graphRef} position={[0.2, 0.9, -0.3]} rotation={new Euler(Math.PI / 5, 0, -Math.PI / 10)}>
        <Image src={graph} size={1.3} side={FrontSide} isBasicMaterial />
      </object3D>


      <mesh ref={backgroundRef}
        position={[0, 0, -1]}>
        <planeGeometry args={[3, 4]} />
        <meshBasicMaterial side={FrontSide} color={'grey'} />
      </mesh>
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