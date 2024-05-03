import { useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import CameraControls from 'camera-controls'
import { useCameraStillnessContext } from '../provider/CameraStillnessProvider'
import { useInteractionState } from '../provider/InteractionStateProvider'

const CAMERA_STILL_DELAY = 1000

function useCameraStillness() {
  const stillCameraTimeout = useRef<ReturnType<typeof setTimeout>>()

  const { hasEnteredRoom } = useInteractionState()

  const { controls }: { controls: CameraControls | null } = useThree()
  const { setIsCameraStill } = useCameraStillnessContext()

  useEffect(() => {
    if (hasEnteredRoom) return
    const fnc = () => {
      if (stillCameraTimeout.current) {
        clearTimeout(stillCameraTimeout.current)
      }

      setIsCameraStill(false)

      stillCameraTimeout.current = setTimeout(() => {
        setIsCameraStill(true)
      }, CAMERA_STILL_DELAY)
    }

    controls?.addEventListener('transitionstart', fnc)

    return () => {
      controls?.removeEventListener('transitionstart', fnc)
    }
  }, [controls, setIsCameraStill, hasEnteredRoom])
}

export default useCameraStillness