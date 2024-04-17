import { MeshProps } from '@react-three/fiber'
import BaseImage, { BaseImageProps, getBaseImageProps } from './BaseImage'

interface ImageProps extends MeshProps { }

function Image({ baseImageProps, ...props }: ImageProps & { baseImageProps: BaseImageProps }): JSX.Element {
  return (
    <mesh {...props}>
      <BaseImage {...baseImageProps} />
    </mesh>
  )
}

type WrappedImageProps = BaseImageProps & ImageProps

const WrappedImage = (props: WrappedImageProps) => {
  const { remainingProps, ...baseImageProps } = getBaseImageProps<ImageProps>(props)

  return (
    <Image baseImageProps={baseImageProps} {...remainingProps} />
  )
}

export default WrappedImage