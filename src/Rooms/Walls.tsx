import { ColorRepresentation, Euler } from "three"
import Panel from "./Panel"

interface WallsProps {
  color?: ColorRepresentation
}

function Walls({ color = "red" }: WallsProps): JSX.Element {
  const SIZE = 12
  const MIDDLE = SIZE / 2
  return (
    <>
      <Panel // Back
        position={[0, 0, -MIDDLE]}
        rotation={new Euler(0, 0, 0)}
        width={SIZE}
        height={SIZE}
        color={color} />
      <Panel // Front
        position={[0, 0, MIDDLE]}
        rotation={new Euler(0, 0, 0)}
        width={SIZE}
        height={SIZE}
        color={color} />
      <Panel // Left
        position={[-MIDDLE, 0, 0]}
        rotation={new Euler(0, -Math.PI / 2, 0)}
        width={SIZE}
        height={SIZE}
        color={color} />
      <Panel // Right
        position={[MIDDLE, 0, 0]}
        rotation={new Euler(0, Math.PI / 2, 0)}
        width={SIZE}
        height={SIZE}
        color={color} />
      <Panel // Floor
        position={[0, -MIDDLE, 0]}
        rotation={new Euler(Math.PI / 2, 0, 0)}
        width={SIZE}
        height={SIZE}
        color={color} />
      <Panel // Ceiling
        position={[0, MIDDLE, 0]}
        rotation={new Euler(Math.PI / 2, 0, 0)}
        width={SIZE}
        height={SIZE}
        color={color} />
    </>
  )
}

export default Walls