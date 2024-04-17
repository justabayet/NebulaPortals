import { extend, useLoader, BufferGeometryNode } from '@react-three/fiber'
import { geometry } from 'maath'
import { TextureLoader, DoubleSide, Side } from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/Addons.js'

export interface BaseImageProps {
  src: string
  size?: number
  radius?: number
  side?: Side
  isBasicMaterial?: boolean
}

extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry })

declare module '@react-three/fiber' {
  interface ThreeElements {
    roundedPlaneGeometry: BufferGeometryNode<RoundedBoxGeometry, typeof RoundedBoxGeometry>
  }
}

export function getBaseImageProps<T>({ src, size, radius, side, isBasicMaterial, ...remainingProps }: BaseImageProps & T) {
  return { src, size, radius, side, isBasicMaterial, remainingProps }
}

function BaseImage({ src, size = 1, radius = 0.1, side = DoubleSide, isBasicMaterial = false }: BaseImageProps): JSX.Element {
  const texture = useLoader(TextureLoader, src)
  const ratio = texture.source.data.height / texture.source.data.width

  return (
    <>
      <roundedPlaneGeometry args={[size, size * ratio, size * radius]} onUpdate={self => self.computeVertexNormals()} />

      {isBasicMaterial
        ? <meshBasicMaterial map={texture} side={side} transparent />
        : <meshStandardMaterial map={texture} side={side} transparent />
      }
    </>
  )
}

export default BaseImage