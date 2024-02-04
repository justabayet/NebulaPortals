import { CameraControls, ScrollControls } from "@react-three/drei"
import CameraControlsOriginal from "camera-controls"
import useInProject from "./useInProject"
import useInTower from "./useInTower"
import { NB_FULL_ROTATION } from "../Rooms/const"

function CameraControlsTuned(): JSX.Element {
  useInProject()
  useInTower()

  return (
    <CameraControls makeDefault mouseButtons={{
      middle: CameraControlsOriginal.ACTION.NONE,
      left: CameraControlsOriginal.ACTION.ROTATE,
      right: CameraControlsOriginal.ACTION.TRUCK,
      wheel: CameraControlsOriginal.ACTION.NONE
    }} smoothTime={0.4} />
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