import { MeshProps } from '@react-three/fiber'
import MeshHoverable from '../MeshHoverable'
import BaseImage, { BaseImageProps } from './BaseImage'

export interface ImageProps extends BaseImageProps, MeshProps {
  hoverable?: boolean
}

function HoverableImage({ hoverable = false, src, size, radius, side, isBasicMaterial, ...props }: ImageProps): JSX.Element {
  const baseImageProps: BaseImageProps = { src, size, radius, side, isBasicMaterial }

  return (
    <MeshHoverable enabledCursor={hoverable} {...props}>
      <BaseImage {...baseImageProps} />
    </MeshHoverable>
  )
}

export default HoverableImage