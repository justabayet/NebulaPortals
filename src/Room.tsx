import { Euler, Vector3 } from "three"
import Panel from "./Panel"

interface RoomProps {
  position: Vector3
}

function Room({ position }: RoomProps): JSX.Element {
  return (
    <object3D position={position}>
      <Panel
        position={new Vector3(-1.5, 0, -1.5)}
        rotation={new Euler(0, 0, 0)}
        width={6}
        height={6} />
      <Panel
        position={new Vector3(-1, 0.2, -1)}
        rotation={new Euler(0, 0, Math.PI)}
        width={1}
        height={1} />
      <Panel
        position={new Vector3(-0.5, -0.2, -0.5)}
        rotation={new Euler(0, 0, Math.PI / 2)}
        width={0.5}
        height={0.5} />
    </object3D>
  )
}

export default Room