import { MeshProps } from '@react-three/fiber'
import MeshHoverable from '../MeshHoverable'
import BaseImage, { BaseImageProps, getBaseImageProps } from './BaseImage'

export interface HoverableImageProps extends MeshProps {
  hoverable?: boolean
}

function HoverableImage({ hoverable = false, baseImageProps, ...props }: HoverableImageProps & { baseImageProps: BaseImageProps }): JSX.Element {
  return (
    <MeshHoverable enabledCursor={hoverable} {...props}>
      <BaseImage {...baseImageProps} />
    </MeshHoverable>
  )
}

type WrappedHoverableImageProps = BaseImageProps & HoverableImageProps

const WrappedHoverableImage = (props: WrappedHoverableImageProps) => {
  const { remainingProps, ...baseImageProps } = getBaseImageProps<HoverableImageProps>(props)

  return (
    <HoverableImage baseImageProps={baseImageProps} {...remainingProps} />
  )
}

export default WrappedHoverableImage