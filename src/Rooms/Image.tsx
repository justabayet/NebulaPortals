import { MeshProps, useLoader } from '@react-three/fiber'
import { geometry } from 'maath'
import { TextureLoader, DoubleSide, Side } from 'three'
import MeshHoverable from '../MeshHoverable'

interface ImageProps extends MeshProps {
  src: string
  size?: number
  radius?: number
  hoverable?: boolean
  side?: Side
}

function Image({ src, size = 1, radius = 0.1, hoverable = false, side = DoubleSide, ...props }: ImageProps): JSX.Element {
  const texture = useLoader(TextureLoader, src)
  const ratio = texture.source.data.height / texture.source.data.width

  const geo = new geometry.RoundedPlaneGeometry(size, size * ratio, size * radius)
  geo.computeVertexNormals()

  return (
    <MeshHoverable geometry={geo} enabled={hoverable} {...props}>
      <meshStandardMaterial map={texture} side={side} transparent />
    </MeshHoverable>
  )
}

export default Image