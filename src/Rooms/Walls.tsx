import { ColorRepresentation, Euler, Vector3 } from "three"
import Panel from "./Panel"

interface WallsProps {
  color?: ColorRepresentation
}

function Walls({ color = "red" }: WallsProps): JSX.Element {
  const SIZE = 12
  const MIDDLE = SIZE / 2
  return (
    <>
      <Panel
        position={new Vector3(0, 0, -MIDDLE)}
        rotation={new Euler(0, 0, 0)}
        width={SIZE}
        height={SIZE}
        color={color} />
      <Panel
        position={new Vector3(-MIDDLE, 0, 0)}
        rotation={new Euler(0, -Math.PI / 2, 0)}
        width={SIZE}
        height={SIZE}
        color={color} />
      <Panel
        position={new Vector3(MIDDLE, 0, 0)}
        rotation={new Euler(0, Math.PI / 2, 0)}
        width={SIZE}
        height={SIZE}
        color={color} />
      <Panel
        position={new Vector3(0, -MIDDLE, 0)}
        rotation={new Euler(Math.PI / 2, 0, 0)}
        width={SIZE}
        height={SIZE}
        color={color} />
      <Panel
        position={new Vector3(0, MIDDLE, 0)}
        rotation={new Euler(Math.PI / 2, 0, 0)}
        width={SIZE}
        height={SIZE}
        color={color} />
    </>
  )
}

export default Walls