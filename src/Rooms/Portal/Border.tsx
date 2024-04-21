import { ColorRepresentation, Euler } from 'three'

export interface BorderSpecificProps {
  color: ColorRepresentation
  borderWidth?: number
}

interface BorderProps extends BorderSpecificProps {
  position: [number, number, number]
  rotation: Euler
}

function Border({ position, rotation, color, borderWidth = 0.05 }: BorderProps): JSX.Element {
  return (
    <object3D position={position} rotation={rotation}>
      <mesh position={[0, 0, -0.01]} >
        <planeGeometry args={[1 + borderWidth, 2 + borderWidth]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </object3D>
  )
}

export default Border