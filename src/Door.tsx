import { MeshPortalMaterial, PortalMaterialType } from "@react-three/drei"
import { Vector3, Mesh, DoubleSide, Object3D } from "three"
import { PropsWithChildren, ReactNode, useLayoutEffect, useRef } from "react"

import { useLocation } from "wouter"
import { useFrame } from "@react-three/fiber"
import { easing } from "maath"

import MeshHoverable from "./MeshHoverable"
import useIsActive from "./hooks/useIsActive"

interface DoorProps extends PropsWithChildren {
  position: Vector3
  name: string
  childrenAbsolute?: ReactNode
}

function faceTowardsParentCenter(object: Object3D) {
  const parent = object.parent
  const focus = new Vector3(0, object.position.y, 0)

  if (parent != null) {
    const parentWorldPosition = parent.getWorldPosition(new Vector3())
    focus.add(parentWorldPosition)
  }

  object.lookAt(focus)
}

function Door({ position, name, children, childrenAbsolute }: DoorProps): JSX.Element {
  const ref = useRef<Mesh>(null)
  const altCenter = useRef<Object3D>(null!)
  const portal = useRef<PortalMaterialType>(null!)

  useLayoutEffect(() => {
    if (ref.current == null) return

    faceTowardsParentCenter(ref.current)
    const portalPos = ref.current?.getWorldPosition(new Vector3())
    altCenter.current.position.copy(portalPos)
    faceTowardsParentCenter(altCenter.current)
  })

  const [, setLocation] = useLocation()
  const isActive = useIsActive(name)
  useFrame((_, dt) => easing.damp(portal.current, 'blend', isActive ? 1 : 0, 0.2, dt))

  return (
    <MeshHoverable position={position} ref={ref} name={name}
      onClick={(e) => (e.stopPropagation(), setLocation('/current/' + name))}>
      <planeGeometry args={[1, 2]} />

      <MeshPortalMaterial blend={0} ref={portal} side={DoubleSide} worldUnits={true}>
        {childrenAbsolute}

        <object3D ref={altCenter}>
          {children}
        </object3D>

      </MeshPortalMaterial>
    </MeshHoverable>
  )
}

export default Door