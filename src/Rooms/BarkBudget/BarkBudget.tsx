import Walls from "./../Walls"
import Door from "./../Door"
import ExitPortal from "./../ExitPortal"
import useIsActive from "../../hooks/useIsActive"
import { RoomProps } from "./../DefaultContent"
import { button, google_button, graph, home, login, record, tabs } from './assets'
import { MeshProps, useLoader } from "@react-three/fiber"
import { DoubleSide, Euler, TextureLoader } from "three"
import { geometry } from 'maath'
import { extend } from '@react-three/fiber'
import MeshHoverable from "../../MeshHoverable"

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
        e.stopPropagation()
        console.log("Home clicked")
      }}
      onPointerMove={(e) => {
        if (!hoverable) return
        console.log("move", e)
      }}>
      <meshStandardMaterial map={texture} side={DoubleSide} />
    </MeshHoverable>
  )
}

function BarkBudget_(): JSX.Element {
  const isActive = useIsActive()

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight
        intensity={3}
        position={[0, 0, 0.5]} />

      <object3D position={[0, 0, -0.4]}>
        <Image src={home} position={[0, 0, 0]} hoverable={true} />
        <Image src={graph} position={[0, 0.57, 0.2]} size={0.85} />

        <Image src={record} position={[0, 0.2, 0.1]} size={0.9} radius={0.06} />
        <Image src={record} position={[0, 0, 0.1]} size={0.9} radius={0.06} />
        <Image src={record} position={[0, -0.2, 0.1]} size={0.9} radius={0.06} />

        <Image src={button} position={[0.3, -0.62, 0.25]} size={0.2} radius={0.5} />
        <Image src={tabs} position={[0, -0.9, 0.1]} size={0.9} radius={0.06} />
      </object3D>

      <object3D position={[-1, 0, 0.2]} rotation={new Euler(0, Math.PI / 3, 0)}>
        <Image src={login} />
        <Image src={google_button} position={[0, -0.3, 0.2]} size={0.2} radius={0.4} />
      </object3D>

      <Walls color={'white'} />

      {isActive && <ExitPortal position={[0, 0, 5.9]} />}
    </>
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