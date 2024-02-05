import { useEffect } from "react"
import useIsTouch from "./useIsTouch"
import CameraControls from "camera-controls"
import { useThree } from "@react-three/fiber"


function useToggleTouch(condition: boolean) {
  const { controls }: { controls: CameraControls | null } = useThree()

  const { events } = useThree()
  const htmlElement: HTMLElement | null = events.connected
  
  const isTouch = useIsTouch(htmlElement)

  useEffect(() => {
    if (controls == null || htmlElement == null) return
    if (!isTouch) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isConnected = (controls as any)._domElement != null

    if (condition) {
      if (!isConnected) controls.connect(htmlElement)
    } else {
      if (isConnected) controls.disconnect()
    }
  }, [condition, controls, htmlElement, isTouch])
}

export default useToggleTouch