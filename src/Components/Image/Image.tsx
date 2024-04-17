import { MeshProps } from '@react-three/fiber'
import { WithBaseImage, withBaseImage } from './BaseImage'

interface ImageProps extends MeshProps, WithBaseImage { }

function Image({ baseImage, ...props }: ImageProps): JSX.Element {
  return (
    <mesh {...props}>
      {baseImage}
    </mesh>
  )
}

const WrappedImage = withBaseImage<ImageProps>(Image)
export default WrappedImage