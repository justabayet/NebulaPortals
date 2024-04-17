import { PortalMaterialType } from '@react-three/drei'
import { Mesh, Object3D, FrontSide, ColorRepresentation, Euler } from 'three'
import { PropsWithChildren, ReactNode, Suspense, useEffect, useMemo, useRef, useState } from 'react'

import { useLocation } from 'wouter'

import MeshHoverable from '../MeshHoverable'
import useIsActive from '../hooks/useIsActive'
import { RoomDataProvider, useRoomData } from '../RoomDataProvider'
import { MeshPortalMaterial } from './MeshPortalMaterial'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'

const DELAY_ENTERING = 100
const DELAY_EXITING = 100

interface Door_Props extends PropsWithChildren, FallbackPanelProps {
  position: [number, number, number]
  index: number
  childrenAbsolute?: ReactNode
  angle: number
}

interface FallbackPanelProps {
  fallbackColor: ColorRepresentation
}

function Door_({ position, children, childrenAbsolute, index, fallbackColor, angle }: Door_Props): JSX.Element {
  const ref = useRef<Mesh>(null)
  const altCenter = useRef<Object3D>(null)
  const portal = useRef<PortalMaterialType>(null)
  const { name, setIsDisplayed } = useRoomData()

  const [, setLocation] = useLocation()
  const isActive = useIsActive()
  const [isBlend, setIsBlend] = useState(isActive)

  useFrame((_, dt) => {
    if (portal.current == null) return
    easing.damp(portal.current, 'blend', isBlend ? 1 : 0, 0.1, dt)

    setIsDisplayed(portal.current.blend > 0)
  })

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setIsBlend(true)
      }, DELAY_ENTERING)
    } else {
      setTimeout(() => {
        setIsBlend(false)
      }, DELAY_EXITING)
    }
  }, [isActive])

  const faceAngle = useMemo(() => new Euler(0, angle - Math.PI / 2, 0), [angle])

  return (
    <>
      <object3D position={position} rotation={faceAngle}>
        <mesh position={[0, 0, -0.001]} >
          <planeGeometry args={[1, 2]} />
          <meshBasicMaterial color={fallbackColor} />
        </mesh>
      </object3D>

      <MeshHoverable ref={ref} position={position} rotation={faceAngle} name={name} enabled={!isActive}
        onClick={(e) => {
          if (isActive) return
          e.stopPropagation()
          setLocation('previous/' + name)
          setLocation('current/' + name)
        }}
        userData={{ index: index }}>
        <planeGeometry args={[1, 2]} />

        <Suspense>
          <MeshPortalMaterial blend={0} ref={portal} side={FrontSide} worldUnits={true} transparent>
            {childrenAbsolute}

            <object3D ref={altCenter} position={position} rotation={faceAngle}>
              {children}
            </object3D>

          </MeshPortalMaterial>
        </Suspense>
      </MeshHoverable>
    </>
  )
}

interface DoorProps extends Door_Props {
  name: string
}

function Door({ name, children, ...props }: DoorProps): JSX.Element {
  return (
    <RoomDataProvider name={name} >
      <Door_ {...props}>
        {children}
      </Door_>
    </RoomDataProvider>
  )
}

export default Door