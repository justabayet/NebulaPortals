import { MeshProps } from "@react-three/fiber"
import { ColorRepresentation, DoubleSide } from "three"

interface PanelProps extends MeshProps {
  width: number
  height: number
  color?: ColorRepresentation
}

function Panel({ width, height, color = "red", ...props }: PanelProps): JSX.Element {
  return (
    <mesh {...props}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial side={DoubleSide} color={color} />
    </mesh>
  )
}

export default Panel