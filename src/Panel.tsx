import { DoubleSide, Euler, Vector3 } from "three"

interface PanelProps {
  position: Vector3,
  rotation: Euler,
  width: number,
  height: number
}

function Panel({ position, rotation, width, height }: PanelProps): JSX.Element {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial side={DoubleSide} color={"red"} />
    </mesh>
  )
}

export default Panel