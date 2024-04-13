import { MeshProps, useLoader } from '@react-three/fiber'
import { geometry } from 'maath'
import { TextureLoader, DoubleSide } from 'three'
import MeshHoverable from '../MeshHoverable'

interface ImageProps extends MeshProps {
  src: string
  size?: number
  radius?: number
  hoverable?: boolean
}

function Image({ src, size = 1, radius = 0.1, hoverable = false, ...props }: ImageProps): JSX.Element {
  const texture = useLoader(TextureLoader, src)
  const ratio = texture.source.data.height / texture.source.data.width

  const geo = new geometry.RoundedPlaneGeometry(size, size * ratio, size * radius)
  geo.computeVertexNormals()

  return (
    <MeshHoverable geometry={geo} enabled={hoverable}
      onClick={(e) => {
        if (!hoverable) return
        // e.stopPropagation()
        console.log('clicked')
      }}
      onPointerMove={(e) => {
        if (!hoverable) return
        // console.log('move', e)
      }}
      {...props}>
      <meshStandardMaterial map={texture} side={DoubleSide} transparent />
    </MeshHoverable>
  )
}

export default Image