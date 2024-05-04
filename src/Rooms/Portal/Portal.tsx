import { PortalMaterialType } from '../../Components/MeshPortalMaterial'
import { Detailed } from '@react-three/drei/core/Detailed'
import { FrontSide, ColorRepresentation, Euler } from 'three'
import { PropsWithChildren, ReactNode, Suspense, lazy, useCallback, useEffect, useMemo, useRef } from 'react'

import { RoomDataProvider, useRoomData } from '../../provider/RoomDataProvider'
import { MeshHoverable } from '../../Components'
import useBlending from './useBlending'
import Fallback from './Fallback'
import { ThreeEvent } from '@react-three/fiber'
import { RoomProps } from '../interface'
import { useSetInteractionState } from '../../provider/InteractionStateProvider'
import Border, { BorderSpecificProps } from './Border'
import { useRoomReady } from '../../provider/RoomReadyProvider'

const MeshPortalMaterial = lazy(() => import('../../Components/MeshPortalMaterial'))

interface PortalInternalProps extends PropsWithChildren, RoomProps {
  childrenAbsolute?: ReactNode
  fallbackColor: ColorRepresentation
  border?: BorderSpecificProps
}

function Portal({ position, children, childrenAbsolute, index, fallbackColor, angle, border }: PortalInternalProps): JSX.Element {
  const { name, isActive, setLocation } = useRoomData()

  const portal = useRef<PortalMaterialType>(null)
  useBlending(portal)

  const rotation = useMemo(() => new Euler(0, angle - Math.PI / 2, 0), [angle])

  const { setHasEnteredRoom } = useSetInteractionState()

  const onClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    if (isActive) return
    e.stopPropagation()
    setLocation('previous/' + name)
    setLocation('current/' + name)
    setHasEnteredRoom(true)
  }, [isActive, name, setLocation, setHasEnteredRoom])

  return (
    <>
      {border != null && <Border position={position} rotation={rotation} {...border} />}

      <Fallback position={position} rotation={rotation} color={fallbackColor} />

      <Detailed distances={[0, 8]} position={position} rotation={rotation}>
        <MeshHoverable
          name={name}
          enabledCursor={!isActive}
          onClick={onClick}
          userData={{ index: index, position }}>
          <planeGeometry args={[1, 2]} />

          <Suspense fallback={<meshStandardMaterial transparent opacity={0} />}>
            <MeshPortalMaterial blend={0.1} ref={portal} side={FrontSide} worldUnits={true} transparent>
              {childrenAbsolute}

              <object3D position={position} rotation={rotation}>
                {children}
              </object3D>

              <IsReady name={name} />

            </MeshPortalMaterial>
          </Suspense>
        </MeshHoverable>

        <mesh visible={false} />
      </Detailed>
    </>
  )
}

interface IsReadyProps {
  name: string
}

function IsReady({ name }: IsReadyProps): JSX.Element {
  const { setRoomReady } = useRoomReady()
  useEffect(() => {
    setRoomReady(name)
  }, [setRoomReady, name])

  return <></>
}

interface WrapperProps {
  name: string
}

export type PortalProps = WrapperProps & PortalInternalProps

function WrappedPortal({ name, ...props }: PortalProps) {
  return (
    <RoomDataProvider name={name} >
      <Portal {...props} />
    </RoomDataProvider>
  )
}

export default WrappedPortal