import { useCursor } from '@react-three/drei/web/useCursor'
import { forwardRef, useEffect, useState } from 'react'

import { Object3DProps } from '@react-three/fiber'
import { Object3D } from 'three'


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

interface Object3DHoverableProps extends Object3DProps {
  enabledCursor?: boolean
}

const Object3DHoverable = forwardRef<Object3D, Object3DHoverableProps>(({ enabledCursor = true, children, onPointerOver, onPointerOut, ...props }, ref): JSX.Element => {
  const { onHover } = useOnHover(enabledCursor)

  return (
    <object3D
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
    </object3D>
  )
})

export default Object3DHoverable