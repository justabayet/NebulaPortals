import { Detailed, PortalMaterialType } from '@react-three/drei'
import { FrontSide, ColorRepresentation, Euler } from 'three'
import { PropsWithChildren, ReactNode, Suspense, useCallback, useMemo, useRef } from 'react'

import { useLocation } from 'wouter'

import { useIsActive } from '../../hooks'
import { RoomDataProvider, useRoomData } from '../../provider/RoomDataProvider'
import { MeshPortalMaterial, MeshHoverable } from '../../Components'
import useBlending from './useBlending'
import Fallback from './Fallback'
import { ThreeEvent } from '@react-three/fiber'
import { RoomProps } from '../interface'


interface PortalInternalProps extends PropsWithChildren, RoomProps {
  childrenAbsolute?: ReactNode
  fallbackColor: ColorRepresentation
}

function Portal({ position, children, childrenAbsolute, index, fallbackColor, angle }: PortalInternalProps): JSX.Element {
  const { name } = useRoomData()

  const [, setLocation] = useLocation()
  const isActive = useIsActive()

  const portal = useRef<PortalMaterialType>(null)
  useBlending(portal)

  const rotation = useMemo(() => new Euler(0, angle - Math.PI / 2, 0), [angle])

  const onClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    if (isActive) return
    e.stopPropagation()
    setLocation('previous/' + name)
    setLocation('current/' + name)
  }, [isActive, name, setLocation])

  return (
    <>
      <Fallback position={position} rotation={rotation} color={fallbackColor} />

      <Detailed distances={[0, 8]} position={position} rotation={rotation}>
        <MeshHoverable
          name={name}
          enabledCursor={!isActive}
          onClick={onClick}
          userData={{ index: index, position }}>
          <planeGeometry args={[1, 2]} />

          <Suspense>
            <MeshPortalMaterial blend={0} ref={portal} side={FrontSide} worldUnits={true} transparent>
              {childrenAbsolute}

              <object3D position={position} rotation={rotation}>
                {children}
              </object3D>

            </MeshPortalMaterial>
          </Suspense>
        </MeshHoverable>

        <mesh visible={false} />
      </Detailed>
    </>
  )
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