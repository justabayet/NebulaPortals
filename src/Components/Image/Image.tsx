import { MeshProps, extend, useLoader, BufferGeometryNode } from '@react-three/fiber'
import { geometry } from 'maath'
import { TextureLoader, DoubleSide, Side } from 'three'
import MeshHoverable from '../MeshHoverable'
import { RoundedBoxGeometry } from 'three/examples/jsm/Addons.js'

export interface ImageProps extends MeshProps {
  src: string
  size?: number
  radius?: number
  hoverable?: boolean
  side?: Side
  isBasicMaterial?: boolean
}

extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry })

declare module '@react-three/fiber' {
  interface ThreeElements {
    roundedPlaneGeometry: BufferGeometryNode<RoundedBoxGeometry, typeof RoundedBoxGeometry>
  }
}


function Image({ src, size = 1, radius = 0.1, hoverable = false, side = DoubleSide, isBasicMaterial = false, ...props }: ImageProps): JSX.Element {
  const texture = useLoader(TextureLoader, src)
  const ratio = texture.source.data.height / texture.source.data.width

  return (
    <MeshHoverable enabledCursor={hoverable} {...props}>
      <roundedPlaneGeometry args={[size, size * ratio, size * radius]} onUpdate={self => self.computeVertexNormals()} />

      {isBasicMaterial
        ? <meshBasicMaterial map={texture} side={side} transparent />
        : <meshStandardMaterial map={texture} side={side} transparent />
      }
    </MeshHoverable>
  )
}

export default Image