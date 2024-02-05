import { CameraControls, ScrollControls } from "@react-three/drei"
import CameraControlsOriginal from "camera-controls"
import useInProject from "./useInProject"
import useInTower from "./useInTower"
import { NB_FULL_ROTATION } from "../Rooms/const"
import { useEffect, useRef } from "react"
import { useThree } from "@react-three/fiber"

function CameraControlsTuned(): JSX.Element {
  const { isInsideProject } = useInProject()
  useInTower()

  const controlsRef = useRef<CameraControls>(null!)
  const controls = controlsRef.current

  const { events } = useThree()

  useEffect(() => {
    if (controls == null) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isConnected = (controls as any)._domElement != null

    if (isInsideProject) {
      if (!isConnected) controls.connect(events.connected)
    } else {
      if (isConnected) controls.disconnect()
    }
  }, [isInsideProject, controls, events.connected])

  return (
    <CameraControls makeDefault smoothTime={0.4} ref={controlsRef}
      mouseButtons={{
        middle: CameraControlsOriginal.ACTION.NONE,
        left: CameraControlsOriginal.ACTION.ROTATE,
        right: CameraControlsOriginal.ACTION.NONE,
        wheel: CameraControlsOriginal.ACTION.NONE
      }}
      touches={{
        one: CameraControlsOriginal.ACTION.TOUCH_ROTATE,
        two: CameraControlsOriginal.ACTION.NONE,
        three: CameraControlsOriginal.ACTION.NONE
      }} />
  )
}


function Controls(): JSX.Element {
  return (
    <ScrollControls pages={NB_FULL_ROTATION} damping={0.15}>
      <CameraControlsTuned />
    </ScrollControls>
  )
}

export default Controls