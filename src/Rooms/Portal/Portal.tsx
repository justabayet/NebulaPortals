import { PortalMaterialType } from '@react-three/drei'
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

  const faceAngle = useMemo(() => new Euler(0, angle - Math.PI / 2, 0), [angle])

  const onClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    if (isActive) return
    e.stopPropagation()
    setLocation('previous/' + name)
    setLocation('current/' + name)
  }, [isActive, name, setLocation])

  return (
    <>
      <Fallback position={position} rotation={faceAngle} color={fallbackColor} />

      <MeshHoverable
        position={position}
        rotation={faceAngle}
        name={name}
        enabledCursor={!isActive}
        onClick={onClick}
        userData={{ index: index }}
      >
        <planeGeometry args={[1, 2]} />

        <Suspense>
          <MeshPortalMaterial blend={0} ref={portal} side={FrontSide} worldUnits={true} transparent>
            {childrenAbsolute}

            <object3D position={position} rotation={faceAngle}>
              {children}
            </object3D>

          </MeshPortalMaterial>
        </Suspense>
      </MeshHoverable>
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