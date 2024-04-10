import { useEffect } from "react"
import useIsTouch from "./useIsTouch"
import CameraControls from "camera-controls"
import { useThree } from "@react-three/fiber"


function useToggleTouch(shouldBeInteractive: boolean) {
  const { controls }: { controls: CameraControls | null } = useThree()

  const { events } = useThree()
  const interactiveArea: HTMLElement | null = events.connected
  
  const isTouchDevice = useIsTouch(interactiveArea)

  useEffect(() => {
    if (controls == null || interactiveArea == null) return
    if (!isTouchDevice) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isInteractive = (controls as any)._domElement != null

    if (shouldBeInteractive) {
      if (!isInteractive) controls.connect(interactiveArea)
    } else {
      if (isInteractive) controls.disconnect()
    }
  }, [shouldBeInteractive, controls, interactiveArea, isTouchDevice])
}

export default useToggleTouch