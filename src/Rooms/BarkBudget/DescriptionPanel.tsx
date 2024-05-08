import { Object3DProps } from '@react-three/fiber'
import { Image } from '../../Components'
import { description, white_background } from './assets'


function DescriptionPanel(props: Object3DProps): JSX.Element {
  return (
    <object3D {...props}>
      <Image src={description} position={[0, 0, 0.1]} radius={0.05} isBasicMaterial waitForLoading />
      <Image src={white_background} position={[0, 0, -0.1]} size={1.1} />
    </object3D>
  )
}

export default DescriptionPanel