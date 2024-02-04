import { Vector3 } from "three"
import Walls from "./Walls"
import Door from "./Door"
import ExitPortal from "./ExitPortal"
import Panel from "./Panel"
import useIsActive from "../hooks/useIsActive"
import { RoomProps } from "./DefaultContent"


function BarkBudget_(): JSX.Element {
  const isActive = useIsActive()

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight intensity={3} />

      <Walls color={'white'} />

      <Panel
        position={new Vector3(-0.5, 0, -0.5)}
        width={1}
        height={1}
        color={'black'} />
      <Panel
        position={new Vector3(0.5, -0.2, -0.5)}
        width={0.5}
        height={0.5}
        color={'grey'} />

      {isActive && <ExitPortal position={new Vector3(0, 0, 6)} />}
    </>
  )
}

function BarkBudget({ position, index }: RoomProps): JSX.Element {
  return (
    <Door position={position} name={'BarkBudget'} index={index}>
      <BarkBudget_ />
    </Door>
  )
}

export default BarkBudget