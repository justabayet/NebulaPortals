import { MeshProps } from '@react-three/fiber'
import BaseImage, { BaseImageProps } from './BaseImage'

export interface ImageProps extends BaseImageProps, MeshProps { }

function Image({ src, size, radius, side, isBasicMaterial, ...props }: ImageProps): JSX.Element {
  const baseImageProps = { src, size, radius, side, isBasicMaterial }

  return (
    <mesh {...props}>
      <BaseImage {...baseImageProps} />
    </mesh>
  )
}

export default Image