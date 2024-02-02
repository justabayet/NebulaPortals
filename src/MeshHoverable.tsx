import { useCursor } from "@react-three/drei"
import { forwardRef, useEffect, useState } from "react"

import { MeshProps } from "@react-three/fiber"
import { Mesh } from "three"


const MeshHoverable = forwardRef<Mesh, MeshProps>(function MeshHoverable({ children, onPointerOver, onPointerOut, ...props }, ref): JSX.Element {
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  useEffect(() => {
    return () => {
      setHovered(false)
    }
  }, [])

  return (
    <mesh
      ref={ref}
      onPointerOver={(event) => {
        setHovered(true)
        if (onPointerOver) onPointerOver(event)
      }}
      onPointerOut={(event) => {
        setHovered(false)
        if (onPointerOut) onPointerOut(event)
      }}
      {...props}>
      {children}
    </mesh>
  )
})

export default MeshHoverable