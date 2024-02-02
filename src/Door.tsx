import { MeshPortalMaterial, PortalMaterialType, useCursor } from "@react-three/drei"
import { Vector3, Mesh, DoubleSide, Object3D } from "three"
import { useLayoutEffect, useRef, useState } from "react"

import Room from "./Room"
import { useLocation, useRoute } from "wouter"
import { useFrame } from "@react-three/fiber"
import { easing } from "maath"
import Balls from "./Balls"

interface DoorProps {
  position: Vector3
  name: string
}

function useFaceTowardsParentCenter(object: Object3D | null) {
  useLayoutEffect(() => {
    if (object == null) return

    const parent = object.parent
    const focus = new Vector3(0, object.position.y, 0)

    if (parent != null) {
      const parentWorldPosition = parent.getWorldPosition(new Vector3())
      focus.add(parentWorldPosition)
    }

    object.lookAt(focus)
  }, [object, object?.position, object?.parent?.position])
}

function Door({ position, name }: DoorProps): JSX.Element {
  const ref = useRef<Mesh>(null)
  const altCenter = useRef<Object3D>(null!)
  const portal = useRef<PortalMaterialType>(null!)

  useFaceTowardsParentCenter(ref.current)
  useFaceTowardsParentCenter(altCenter.current)

  useLayoutEffect(() => {
    if (ref.current == null) return

    const portalPos = ref.current?.getWorldPosition(new Vector3())
    altCenter.current.position.copy(portalPos)
  })

  const [, setLocation] = useLocation()
  const [, params] = useRoute('/current/:name')
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  useFrame((_, dt) => easing.damp(portal.current, 'blend', params?.name === name ? 1 : 0, 0.2, dt))

  const isActive = params?.name === name

  return (
    <mesh position={position} ref={ref} name={name}
      onClick={(e) => (e.stopPropagation(), setLocation('/current/' + name))}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}>
      <planeGeometry args={[1, 2]} />
      <MeshPortalMaterial blend={0} ref={portal} side={DoubleSide} worldUnits={true}>
        <ambientLight intensity={0.5} />
        <pointLight intensity={10} />

        <object3D ref={altCenter}>
          <Room />

          {isActive &&
            <mesh position={new Vector3(0, 0, 2)}
              onClick={(e) => (e.stopPropagation(), setLocation('/previous/' + name))}
              onPointerOver={() => hover(true)}
              onPointerOut={() => hover(false)}>
              <planeGeometry args={[1, 1]} />
              <MeshPortalMaterial side={DoubleSide} worldUnits={true}>
                <color attach="background" args={["#131313"]} />
                <Balls />
              </MeshPortalMaterial>
            </mesh>}
        </object3D>

      </MeshPortalMaterial>
    </mesh>
  )
}

export default Door