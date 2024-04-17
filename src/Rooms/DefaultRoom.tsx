

import { ColorRepresentation } from 'three'
import { Panel } from '../Components'
import { useRoomData } from '../provider/RoomDataProvider'
import Portal from './Portal'
import Walls from './Walls'
import ExitPortal from './ExitPortal'
import { RoomProps } from './interface'

interface DefaultRoomInternalProps {
  color: ColorRepresentation
}

function DefaultRoom({ color }: DefaultRoomInternalProps): JSX.Element {
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

interface WrapperProps {
  name: string
}

export type DefaultRoomProps = WrapperProps & DefaultRoomInternalProps & RoomProps

function WrappedDefaultRoom({ color = 'red', ...props }: DefaultRoomProps): JSX.Element {
  return (
    <Portal fallbackColor={color} {...props}>
      <DefaultRoom color={color} />
    </Portal>
  )
}

export default WrappedDefaultRoom