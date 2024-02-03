

import { ColorRepresentation, Vector3 } from "three"
import Walls from "./Walls"
import ExitPortal from "./ExitPortal"
import Panel from "./Panel"
import useIsActive from "../hooks/useIsActive"
import Door from "./Door"
import Balls from "../Balls"

export interface RoomProps {
  position: Vector3
}

interface DefaultContentProps {
  color?: ColorRepresentation
}

function DefaultContent_({ color = "red" }: DefaultContentProps): JSX.Element {
  const isActive = useIsActive()

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight intensity={3} />

      <Walls color={color} />

      <Panel
        position={new Vector3(-0.5, 0, -0.5)}
        width={1}
        height={1}
        color={color} />
      <Panel
        position={new Vector3(0.5, -0.2, -0.5)}
        width={0.5}
        height={0.5}
        color={color} />

      {isActive && <ExitPortal position={new Vector3(0, 0, 3)} />}
    </>
  )
}

function DefaultContent({ position, name, ...props }: DefaultContentProps & RoomProps & { name: string }): JSX.Element {
  return (
    <Door position={position} name={name} childrenAbsolute={(
      <Balls color={props.color} />
    )}>
      <DefaultContent_ {...props} />
    </Door>
  )
}

export default DefaultContent