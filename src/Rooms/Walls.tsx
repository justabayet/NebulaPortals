import { ColorRepresentation } from 'three'
import { Panel } from '../Components'
import ExitPanel from '../Components/ExitPanel'

interface WallsProps {
  color?: ColorRepresentation
}

function Walls({ color = 'red' }: WallsProps): JSX.Element {
  const SIZE = 12
  const MIDDLE = SIZE / 2
  return (
    <>
      <Panel // Back
        position={[0, 0, -MIDDLE]}
        rotation={[0, 0, 0]}
        width={SIZE}
        height={SIZE}
        color={color} />

      <ExitPanel
        position={[0, MIDDLE - 1, MIDDLE + 2.5]}
        rotation={[0, -Math.PI, 0]}
        scale={2} />
      <Panel // Front
        position={[0, 0, MIDDLE + 3]}
        rotation={[0, -Math.PI, 0]}
        width={SIZE}
        height={SIZE}
        color={color} />

      <ExitPanel
        position={[-MIDDLE + 1, MIDDLE - 1, 0]}
        rotation={[0, Math.PI / 2, 0]}
        scale={2}
        direction='left' />
      <Panel // Left
        position={[-MIDDLE, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        width={SIZE + 6}
        height={SIZE}
        color={color} />

      <ExitPanel
        position={[MIDDLE - 1, MIDDLE - 1, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={2}
        direction='right' />
      <Panel // Right
        position={[MIDDLE, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        width={SIZE + 6}
        height={SIZE}
        color={color} />

      <Panel // Floor
        position={[0, -MIDDLE, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        width={SIZE}
        height={SIZE + 6}
        color={color} />
      <Panel // Ceiling
        position={[0, MIDDLE, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        width={SIZE}
        height={SIZE + 6}
        color={color} />
    </>
  )
}

export default Walls