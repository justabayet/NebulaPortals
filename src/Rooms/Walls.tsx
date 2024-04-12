import { ColorRepresentation, Euler } from 'three'
import Panel from './Panel'

interface WallsProps {
  color?: ColorRepresentation
}

const ROTATION = {
  FRONT: new Euler(0, -Math.PI, 0),
  BACK: new Euler(0, 0, 0),
  LEFT: new Euler(0, Math.PI / 2, 0),
  RIGHT: new Euler(0, -Math.PI / 2, 0),
  TOP: new Euler(Math.PI / 2, 0, 0),
  BOT: new Euler(-Math.PI / 2, 0, 0)
}

function Walls({ color = 'red' }: WallsProps): JSX.Element {
  const SIZE = 12
  const MIDDLE = SIZE / 2
  return (
    <>
      <Panel // Back
        position={[0, 0, -MIDDLE]}
        rotation={ROTATION.BACK}
        width={SIZE}
        height={SIZE}
        color={color} />
      <Panel // Front
        position={[0, 0, MIDDLE]}
        rotation={ROTATION.FRONT}
        width={SIZE}
        height={SIZE}
        color={color} />
      <Panel // Left
        position={[-MIDDLE, 0, 0]}
        rotation={ROTATION.LEFT}
        width={SIZE}
        height={SIZE}
        color={color} />
      <Panel // Right
        position={[MIDDLE, 0, 0]}
        rotation={ROTATION.RIGHT}
        width={SIZE}
        height={SIZE}
        color={color} />
      <Panel // Floor
        position={[0, -MIDDLE, 0]}
        rotation={ROTATION.BOT}
        width={SIZE}
        height={SIZE}
        color={color} />
      <Panel // Ceiling
        position={[0, MIDDLE, 0]}
        rotation={ROTATION.TOP}
        width={SIZE}
        height={SIZE}
        color={color} />
    </>
  )
}

export default Walls