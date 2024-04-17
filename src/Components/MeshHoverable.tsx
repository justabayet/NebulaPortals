import { useCursor } from '@react-three/drei'
import { forwardRef, useEffect, useState } from 'react'

import { MeshProps } from '@react-three/fiber'
import { Mesh } from 'three'


function useOnHover(enabled = true) {
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  useEffect(() => setHovered(false), [])

  useEffect(() => {
    if (!enabled) setHovered(false)
  }, [enabled])

  return {
    onHover: (isHovered = true) => {
      if (!enabled) return

      setHovered(isHovered)
    }
  }
}

interface MeshHoverableProps extends MeshProps {
  enabledCursor?: boolean
}

const MeshHoverable = forwardRef<Mesh, MeshHoverableProps>(({ enabledCursor = true, children, onPointerOver, onPointerOut, ...props }, ref): JSX.Element => {
  const { onHover } = useOnHover(enabledCursor)

  return (
    <mesh
      ref={ref}
      onPointerOver={(event) => {
        onHover(true)
        if (onPointerOver) onPointerOver(event)
      }}

      onPointerOut={(event) => {
        onHover(false)
        if (onPointerOut) onPointerOut(event)
      }}

      {...props}>
      {children}
    </mesh>
  )
})

export default MeshHoverable