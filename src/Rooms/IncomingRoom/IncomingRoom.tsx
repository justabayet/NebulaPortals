import { Center } from '@react-three/drei/core/Center'
import { Text3D } from '@react-three/drei/core/Text3D'
import { Color, ColorRepresentation } from 'three'
import { Panel } from '../../Components'
import { useRoomData } from '../../provider/RoomDataProvider'
import ExitPortal from '../ExitPortal'
import Portal from '../Portal'
import Walls from '../Walls'
import { RoomProps } from '../interface'
import { useMemo } from 'react'

interface IncomingRoomInternalProps {
  color: ColorRepresentation
}

function IncomingRoom({ color }: IncomingRoomInternalProps): JSX.Element {
  const { isDisplayed } = useRoomData()

  const textColor = useMemo(() => {
    return new Color(color).lerp(new Color('white'), 0.1)
  }, [color])
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight intensity={5} position={[1, 0, -2]} />

      <Center position={[0, 0, -4]}>
        <Text3D
          curveSegments={16}
          bevelEnabled
          bevelSegments={8}
          bevelSize={0.04}
          bevelThickness={0.05}
          height={0.1}
          lineHeight={0.7}
          letterSpacing={0.06}
          size={0.5}
          font="/Inter_Bold.json">
          {'I\nN\nC.'}
          <meshStandardMaterial color={textColor} />
        </Text3D>
      </Center>

      <Walls color={color} />

      <Panel
        position={[-0.5, 0, -5.5]}
        width={2}
        height={2}
        color={color} />
      <Panel
        position={[0.5, -0.2, -5]}
        width={0.5}
        height={0.5}
        color={color} />
      <Panel
        position={[0.7, 1.1, -1]}
        width={1}
        height={1}
        color={color} />
      <Panel
        position={[-0.7, -1.1, -1]}
        width={1}
        height={1}
        color={color} />

      <ExitPortal position={[0, 0, 5.9]} isVisible={isDisplayed} />
    </>
  )
}

interface WrapperProps {
  name: string
}

export type IncomingRoomProps = WrapperProps & IncomingRoomInternalProps & RoomProps

function WrappedIncomingRoom({ color = 'red', ...props }: IncomingRoomProps): JSX.Element {
  const fallbackColor = useMemo(() => new Color(color).lerp(new Color('black'), 0.9), [color])
  return (
    <Portal fallbackColor={fallbackColor} {...props}>
      <IncomingRoom color={color} />
    </Portal>
  )
}

export default WrappedIncomingRoom