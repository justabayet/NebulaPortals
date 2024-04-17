import { RefObject, useCallback } from 'react'
import { Object3D, Vector2 } from 'three'
import { useAnimatedRotation, useIsTouch } from '../../hooks'
import Image, { ImageProps } from './Image'

interface TiltableImageProps extends ImageProps {
  refToTilt: RefObject<Object3D>
}

function TiltableImage({ refToTilt, ...props }: TiltableImageProps): JSX.Element {
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
    <Image hoverable={true}
      onPointerMove={(e) => {
        if (e.uv == null || isTouch) return
        rotateTowards(e.uv)
      }}
      onPointerOut={() => {
        resetRotation()
      }}
      {...props} />
  )
}

export default TiltableImage