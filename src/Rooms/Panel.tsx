import { MeshProps } from '@react-three/fiber'
import { ColorRepresentation, FrontSide } from 'three'

interface PanelProps extends MeshProps {
  width: number
  height: number
  color?: ColorRepresentation
}

function Panel({ width, height, color = 'red', ...props }: PanelProps): JSX.Element {
  return (
    <mesh {...props}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial side={FrontSide} color={color} />
    </mesh>
  )
}

export default Panel