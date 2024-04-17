import { RefObject, useCallback } from 'react'
import { Object3D, Vector2 } from 'three'
import { useAnimatedRotation, useIsTouch } from '../../hooks'
import MeshHoverable from '../MeshHoverable'
import { WithBaseImage, withBaseImage } from './BaseImage'
import { MeshProps } from '@react-three/fiber'

interface TiltableImageProps extends MeshProps, WithBaseImage {
  refToTilt: RefObject<Object3D>
}

function TiltableImage({ refToTilt, baseImage, ...props }: TiltableImageProps): JSX.Element {
  const targetRotation = useAnimatedRotation(refToTilt)

  const rotateTowards = useCallback((uv: Vector2) => {
    targetRotation.y = (uv.x - 0.5) * 0.3
    targetRotation.x = -(uv.y - 0.5) * 0.2
  }, [targetRotation])

  const resetRotation = useCallback(() => {
    targetRotation.y = 0
    targetRotation.x = 0
  }, [targetRotation])

  const isTouch = useIsTouch()
  if (isTouch) resetRotation()

  return (
    <MeshHoverable {...props}
      onPointerMove={(e) => {
        if (e.uv == null || isTouch) return
        rotateTowards(e.uv)
      }}

      onPointerOut={() => {
        resetRotation()
      }}>
      {baseImage}
    </MeshHoverable>
  )
}

const WrappedTiltableImage = withBaseImage<TiltableImageProps>(TiltableImage)
export default WrappedTiltableImage