import { Euler, Vector3 } from "three"
import Panel from "./Panel"

function Room(): JSX.Element {
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
      <Panel
        position={new Vector3(-0.5, 0, -0.5)}
        rotation={new Euler(0, 0, 0)}
        width={1}
        height={1} />
      <Panel
        position={new Vector3(0.5, -0.2, -0.5)}
        rotation={new Euler(0, 0, 0)}
        width={0.5}
        height={0.5} />
    </>
  )
}

export default Room