import { DoubleSide, Euler, Vector3 } from "three"
import { Room1Shader } from "./room1Shader"

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
      <shaderMaterial side={DoubleSide}
        fragmentShader={Room1Shader.fragmentShader}
        vertexShader={Room1Shader.vertexShader} />
    </mesh>
  )
}

export default Panel