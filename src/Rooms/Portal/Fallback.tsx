import { ColorRepresentation, Euler } from 'three'

interface FallbackProps {
  position: [number, number, number]
  rotation: Euler
  color: ColorRepresentation
}

function Fallback({ position, rotation, color }: FallbackProps): JSX.Element {
  return (
    <object3D position={position} rotation={rotation}>
      <mesh position={[0, 0, -0.001]} >
        <planeGeometry args={[1, 2]} />
        <meshBasicMaterial color={color} opacity={0.4} transparent />
      </mesh>
    </object3D>
  )
}

export default Fallback