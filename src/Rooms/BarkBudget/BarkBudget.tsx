import { DoubleSide, Euler, Mesh, Object3D, TextureLoader } from 'three'
import { MeshProps, Object3DProps, useLoader, extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { easing, geometry } from 'maath'

import MeshHoverable from '../../MeshHoverable'
import useIsActive from '../../hooks/useIsActive'
import Walls from '../Walls'
import Door from '../Door'
import ExitPortal from '../ExitPortal'
import { RoomProps } from '../DefaultContent'
import Panel from '../Panel'

import { button, google_button, graph, home, login, logo_light, record, tabs } from './assets'

extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry })
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      roundedPlaneGeometry: geometry.RoundedPlaneGeometry
    }
  }
}

interface ImageProps extends MeshProps {
  src: string
  size?: number
  radius?: number
  hoverable?: boolean
}

export function Image({ src, size = 1, radius = 0.1, hoverable = false, ...props }: ImageProps): JSX.Element {
  const texture = useLoader(TextureLoader, src)
  const ratio = texture.source.data.height / texture.source.data.width

  const geo = new geometry.RoundedPlaneGeometry(size, size * ratio, size * radius)
  geo.computeVertexNormals()

  return (
    <MeshHoverable {...props} geometry={geo} enabled={hoverable}
      onClick={(e) => {
        if (!hoverable) return
        e.stopPropagation()
        // console.log('Home clicked')
      }}
      onPointerMove={(e) => {
        if (!hoverable) return
        // console.log('move', e)
      }}>
      <meshStandardMaterial map={texture} side={DoubleSide} transparent />
    </MeshHoverable>
  )
}

function Login(props: Object3DProps): JSX.Element {
  return (
    <object3D {...props}>
      <Image src={login} />
      <Image src={google_button} position={[0, -0.3, 0.2]} size={0.2} radius={0.4} />
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
      easing.damp(backgroundRef.current.position, 'y', isActive ? -2 : 0, 0.3, dt)
    }
    if (graphRef.current != null) {
      easing.damp(graphRef.current.position, 'y', isActive ? 1 : 0.9, 0.3, dt)
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
        width={1.5}
        height={1.5}
        color={color}
        side={DoubleSide} />
    </object3D>
  )
}

function BarkBudget_(): JSX.Element {
  const COLOR = 'white'

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