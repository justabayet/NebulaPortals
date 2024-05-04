import { CameraControls } from '@react-three/drei/core/CameraControls'
import { ScrollControls } from '@react-three/drei/web/ScrollControls'
import CameraControlsOriginal from 'camera-controls'
import useInProject from './useInProject'
import useInTower from './useInTower'
import { NB_FULL_ROTATION } from '../Rooms/const'
import useCameraStillness from './useCameraStillness'
import useToggleScrollbar from '../hooks/useToggleScrollbar'
import useToggleTouch from '../hooks/useToggleTouch'

function CameraControlsTuned(): JSX.Element {
  const { isInsideProject } = useInProject()
  useToggleTouch(isInsideProject)

  useInTower()

  useCameraStillness()

  return (
    <CameraControls makeDefault smoothTime={0.4}
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
  useToggleScrollbar()

  return (
    <ScrollControls pages={NB_FULL_ROTATION} damping={0.15}>
      <CameraControlsTuned />
    </ScrollControls>
  )
}

export default Controls