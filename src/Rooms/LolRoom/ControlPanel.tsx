import { Object3DProps } from '@react-three/fiber'
import { TiltableImage } from '../../Components'
import control_panel from './assets/control_panel.png'
import { useRef } from 'react'
import { FrontSide, Object3D } from 'three'

function ControlPanel(props: Object3DProps): JSX.Element {
  const ref = useRef<Object3D>(null)
  return (
    <object3D {...props}>
      <object3D ref={ref}>
        <TiltableImage src={control_panel} position={[0, 0, 0]} refToTilt={ref} side={FrontSide} />
      </object3D>
    </object3D>
  )
}

export default ControlPanel