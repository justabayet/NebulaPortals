import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { RefObject, useMemo } from 'react'
import { Object3D, Vector3 } from 'three'


function useAnimatedRotation(ref: RefObject<Object3D>) {
  const targetRotation = useMemo(() => new Vector3(), [])

  useFrame((_, dt) => {
    if (ref.current != null) {
      easing.damp(ref.current.rotation, 'x', targetRotation.x, 0.1, dt)
      easing.damp(ref.current.rotation, 'y', targetRotation.y, 0.1, dt)
      easing.damp(ref.current.rotation, 'z', targetRotation.z, 0.1, dt)
    }
  })

  return targetRotation
}

export default useAnimatedRotation