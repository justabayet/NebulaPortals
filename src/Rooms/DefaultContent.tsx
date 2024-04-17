

import { ColorRepresentation } from 'three'
import Walls from './Walls'
import ExitPortal from './ExitPortal'
import Panel from './Panel'
import Door from './Door'
import { useRoomData } from '../RoomDataProvider'

export interface RoomProps {
  position: [number, number, number]
  index: number
  angle: number
}

interface DefaultContentProps {
  color?: ColorRepresentation
}

function DefaultContent_({ color }: DefaultContentProps): JSX.Element {
  const { isDisplayed } = useRoomData()

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

      {isDisplayed && <ExitPortal position={[0, 0, 5.9]} />}
    </>
  )
}

function DefaultContent({ color = 'red', ...props }: DefaultContentProps & RoomProps & { name: string }): JSX.Element {
  return (
    <Door fallbackColor={color} {...props}>
      <DefaultContent_ color={color} />
    </Door>
  )
}

export default DefaultContent