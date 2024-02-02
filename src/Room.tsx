import { Vector3 } from "three"
import Walls from "./Walls"
import Door from "./Door"
import ExitPortal from "./ExitPortal"
import Balls from "./Balls"
import Panel from "./Panel"
import useIsActive from "./hooks/useIsActive"

interface RoomProps {
  position: Vector3
  name: string
}

function Room({ position, name }: RoomProps): JSX.Element {
  const isActive = useIsActive(name)

  return (
    <Door position={position} name={name} childrenAbsolute={(
      <Balls color={"red"} />
    )}>
      <ambientLight intensity={0.5} />
      <pointLight intensity={3} />

      <Walls />

      <Panel
        position={new Vector3(-0.5, 0, -0.5)}
        width={1}
        height={1} />
      <Panel
        position={new Vector3(0.5, -0.2, -0.5)}
        width={0.5}
        height={0.5} />

      {isActive && <ExitPortal roomName={name} position={new Vector3(0, 0, 3)} />}
    </Door>
  )
}

export default Room