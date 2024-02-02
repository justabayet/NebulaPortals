import { CameraControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useEffect } from "react"
import { Vector3 } from "three"
import { useRoute } from "wouter"

const DEFAULT_POSITION = new Vector3(1, 0, 0)
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

      // console.log({ project, param: paramsCurrent.project, scene })

      if (project) {
        project.localToWorld(position.set(0, 0, 2))
        project.localToWorld(focus.set(0, 0, 1))
      }
    }

    if (hasPreviousProject) {
      const project = scene.getObjectByName(paramsPrevious.project)

      // console.log({ project, param: paramsPrevious.project, scene })

      if (project) {
        const y = project.position.y
        focus.set(0, y, 0)
        position.set(1, y, 0)
        // console.log({ focus, position, pos: project.position })
      }
    }

    (controls as unknown as CameraControls)?.setLookAt(...position.toArray(), ...focus.toArray(), true)
  }, [isInsideProject, hasPreviousProject, paramsPrevious, paramsCurrent, controls, scene])

  return (
    <CameraControls makeDefault smoothTime={1} />
  )
}

export default ControlledCamera