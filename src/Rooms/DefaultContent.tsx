

import { ColorRepresentation } from 'three'
import Walls from './Walls'
import ExitPortal from './ExitPortal'
import Panel from './Panel'
import useIsActive from '../hooks/useIsActive'
import Door from './Door'

export interface RoomProps {
  position: [number, number, number]
  index: number
}

interface DefaultContentProps {
  color?: ColorRepresentation
}

function DefaultContent_({ color = 'red' }: DefaultContentProps): JSX.Element {
  const isActive = useIsActive()

  return (
    <>
      <pointLight intensity={15} />

      <Walls color={color} />

      <Panel
        position={[-0.5, 0, -1.5]}
        width={1}
        height={1}
        color={color} />
      <Panel
        position={[0.5, -0.2, -1]}
        width={0.5}
        height={0.5}
        color={color} />

      {isActive && <ExitPortal position={[0, 0, 5.9]} />}
    </>
  )
}

function DefaultContent({ position, name, index, ...props }: DefaultContentProps & RoomProps & { name: string }): JSX.Element {
  return (
    <Door position={position} name={name} index={index}>
      <DefaultContent_ {...props} />
    </Door>
  )
}

export default DefaultContent