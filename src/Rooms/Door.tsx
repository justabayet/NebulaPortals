import { PortalMaterialType } from '@react-three/drei'
import { Vector3, Mesh, DoubleSide, Object3D } from 'three'
import { PropsWithChildren, ReactNode, useLayoutEffect, useRef } from 'react'

import { useLocation } from 'wouter'

import MeshHoverable from '../MeshHoverable'
import useIsActive from '../hooks/useIsActive'
import { RoomDataProvider, useRoomData } from '../RoomDataProvider'
import { MeshPortalMaterial } from './MeshPortalMaterial'

function faceTowardsParentCenter(object: Object3D) {
  const parent = object.parent
  const focus = new Vector3(0, object.position.y, 0)

  if (parent != null) {
    const parentWorldPosition = parent.getWorldPosition(new Vector3())
    focus.add(parentWorldPosition)
  }

  object.lookAt(focus)
}

interface Door_Props extends PropsWithChildren {
  position: [number, number, number]
  index: number
  childrenAbsolute?: ReactNode
}

function Door_({ position, children, childrenAbsolute, index }: Door_Props): JSX.Element {
  const ref = useRef<Mesh>(null)
  const altCenter = useRef<Object3D>(null)
  const portal = useRef<PortalMaterialType>(null)
  const { name } = useRoomData()


  useLayoutEffect(() => {
    if (ref.current == null) return
    if (altCenter.current == null) return

    faceTowardsParentCenter(ref.current)
    const portalPos = ref.current?.getWorldPosition(new Vector3())
    altCenter.current.position.copy(portalPos)
    faceTowardsParentCenter(altCenter.current)
  })

  const [, setLocation] = useLocation()
  const isActive = useIsActive()

  return (
    <MeshHoverable position={position} ref={ref} name={name} enabled={!isActive}
      onClick={(e) => {
        if (isActive) return
        e.stopPropagation()
        setLocation('previous/' + name)
        setLocation('current/' + name)
      }}
      userData={{ index: index }}>
      <planeGeometry args={[1, 2]} />

      <MeshPortalMaterial blend={isActive ? 1 : 0} ref={portal} side={DoubleSide} worldUnits={true} resolution={2}>
        {childrenAbsolute}

        <object3D ref={altCenter}>
          {children}
        </object3D>

      </MeshPortalMaterial>
    </MeshHoverable>
  )
}

interface DoorProps extends Door_Props {
  name: string
}

function Door({ position, name, children, childrenAbsolute, index }: DoorProps): JSX.Element {
  return (
    <RoomDataProvider name={name} >
      <Door_ position={position} childrenAbsolute={childrenAbsolute} index={index}>
        {children}
      </Door_>
    </RoomDataProvider>
  )
}

export default Door