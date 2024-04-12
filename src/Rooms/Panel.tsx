import { MeshProps } from '@react-three/fiber'
import { forwardRef } from 'react'
import { ColorRepresentation, FrontSide, Mesh, Side } from 'three'

interface PanelProps extends MeshProps {
  width: number
  height: number
  color?: ColorRepresentation
  side?: Side
}

const Panel = forwardRef<Mesh, PanelProps>(({ width, height, color = 'red', side = FrontSide, ...props }, ref): JSX.Element => {
  return (
    <mesh {...props} ref={ref}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial side={side} color={color} />
    </mesh>
  )
})

export default Panel