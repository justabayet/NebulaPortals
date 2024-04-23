import { Object3DProps } from '@react-three/fiber'
import { Image } from '../../Components'
import description_panel from './assets/description_panel.png'
import { FrontSide } from 'three'

function DescriptionPanel(props: Object3DProps): JSX.Element {
  return (
    <object3D {...props}>
      <Image src={description_panel} position={[0, 0, -0.1]} size={1.1} side={FrontSide} isBasicMaterial />
    </object3D>
  )
}

export default DescriptionPanel