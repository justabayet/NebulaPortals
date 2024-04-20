import { MeshProps } from '@react-three/fiber'
import MeshHoverable from '../MeshHoverable'
import { WithBaseImage, withBaseImage } from './BaseImage'

interface HoverableImageProps extends MeshProps, WithBaseImage {
  hoverable?: boolean
}

function HoverableImage({ baseImage, hoverable = true, ...props }: HoverableImageProps): JSX.Element {
  return (
    <MeshHoverable enabledCursor={hoverable} {...props}>
      {baseImage}
    </MeshHoverable>
  )
}

const WrappedHoverableImage = withBaseImage<HoverableImageProps>(HoverableImage)
export default WrappedHoverableImage