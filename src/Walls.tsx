import { Euler, Vector3 } from "three"
import Panel from "./Panel"

function Walls(): JSX.Element {
  const SIZE = 12
  const MIDDLE = SIZE / 2
  return (
    <>
      <Panel
        position={new Vector3(0, 0, -MIDDLE)}
        rotation={new Euler(0, 0, 0)}
        width={SIZE}
        height={SIZE} />
      <Panel
        position={new Vector3(-MIDDLE, 0, 0)}
        rotation={new Euler(0, -Math.PI / 2, 0)}
        width={SIZE}
        height={SIZE} />
      <Panel
        position={new Vector3(MIDDLE, 0, 0)}
        rotation={new Euler(0, Math.PI / 2, 0)}
        width={SIZE}
        height={SIZE} />
      <Panel
        position={new Vector3(0, 0, MIDDLE)}
        rotation={new Euler(0, Math.PI, 0)}
        width={SIZE}
        height={SIZE} />
      <Panel
        position={new Vector3(0, -MIDDLE, 0)}
        rotation={new Euler(Math.PI / 2, 0, 0)}
        width={SIZE}
        height={SIZE} />
    </>
  )
}

export default Walls