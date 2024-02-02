import { CameraControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useEffect } from "react"
import { Vector3 } from "three"
import { useRoute } from "wouter"

const DEFAULT_POSITION = new Vector3(-2, 0, 0)
const DEFAULT_FOCUS = new Vector3(0, 0, 0)

const position = new Vector3(0, 0, 0)
const focus = new Vector3(0, 0, 0)

function ControlledCamera(): JSX.Element {
  const { controls, scene } = useThree()
  const [isInsideProject, paramsCurrent] = useRoute('/current/:project')
  const [hasPreviousProject, paramsPrevious] = useRoute('/previous/:project')

  useEffect(() => {
    position.copy(DEFAULT_POSITION)
    focus.copy(DEFAULT_FOCUS)

    if (isInsideProject) {
      const project = scene.getObjectByName(paramsCurrent.project)

      if (project) {
        project.localToWorld(position.set(0, 0, 2))
        project.localToWorld(focus.set(0, 0, 1))
      }
    }

    if (hasPreviousProject) {
      const project = scene.getObjectByName(paramsPrevious.project)

      if (project) {
        const y = project.position.y
        const newPosition = project.position.clone()
          .setY(0)
          .normalize()
          .multiplyScalar(-1)
          .setY(y)

        focus.set(0, y, 0)
        position.copy(newPosition)
      }
    }

    (controls as unknown as CameraControls)?.setLookAt(...position.toArray(), ...focus.toArray(), true)
  }, [isInsideProject, hasPreviousProject, paramsPrevious, paramsCurrent, controls, scene])

  return (
    <CameraControls makeDefault smoothTime={1} />
  )
}

export default ControlledCamera