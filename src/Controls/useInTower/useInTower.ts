import { CameraControls, useScroll } from "@react-three/drei"
import useDefault, { DEFAULT_FOCUS, DEFAULT_POSITION } from "./useDefault"
import useExitingProject from "./useExitingProject"
import { FULL_ANGLE, FULL_HEIGHT } from "../../Rooms/const"
import { useThree, useFrame } from "@react-three/fiber"
import { Scene, PerspectiveCamera, Vector3 } from "three"

function useScrollControl(enabled = true) {
  const { controls }: { scene: Scene, controls: CameraControls | null, camera: PerspectiveCamera } = useThree()

  const scrollState = useScroll()
  useFrame(() => {
    if(!controls || !enabled) return

    if(scrollState.delta !== 0) {
      const ratio = scrollState.el.scrollTop / scrollState.el.children[1].scrollHeight
      const newY = -FULL_HEIGHT * ratio
      const newAngle = -FULL_ANGLE * ratio

      const newFocus = DEFAULT_FOCUS.clone()
        .setY(newY)

      const newPosition = DEFAULT_POSITION.clone()
        .applyAxisAngle(new Vector3(0, 1, 0), newAngle)
        .setY(newY)

      controls.setLookAt(...newPosition.toArray(), ...newFocus.toArray(), true)
    }
    
  })
}

function useInTower() {
  const { isDefault } = useDefault()
  const { isExitingProject } = useExitingProject()

  useScrollControl(isDefault || isExitingProject)
}

export default useInTower