import { useCursor } from "@react-three/drei"
import { forwardRef, useEffect, useState } from "react"

import { MeshProps } from "@react-three/fiber"
import { Mesh } from "three"

interface MeshHoverableProps extends MeshProps {
  enabled?: boolean
}
const MeshHoverable = forwardRef<Mesh, MeshHoverableProps>(function MeshHoverable({ enabled = true, children, onPointerOver, onPointerOut, ...props }, ref): JSX.Element {
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  useEffect(() => {
    return () => {
      setHovered(false)
    }
  }, [])

  useEffect(() => {
    if (!enabled) setHovered(false)
  }, [enabled])

  return (
    <mesh
      ref={ref}
      onPointerOver={(event) => {
        if (!enabled) return

        setHovered(true)
        if (onPointerOver) onPointerOver(event)
      }}
      onPointerOut={(event) => {
        if (!enabled) return

        setHovered(false)
        if (onPointerOut) onPointerOut(event)
      }}
      {...props}>
      {children}
    </mesh>
  )
})

export default MeshHoverable