import { useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import CameraControls from 'camera-controls'
import { useCameraStillnessContext } from '../provider/CameraStillnessProvider'

const CAMERA_STILL_DELAY = 1000

function useCameraStillness() {
  const stillCameraTimeout = useRef<ReturnType<typeof setTimeout>>()

  const { controls }: { controls: CameraControls | null } = useThree()
  const { setIsCameraStill } = useCameraStillnessContext()

  useEffect(() => {
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
  }, [controls, setIsCameraStill])
}

export default useCameraStillness