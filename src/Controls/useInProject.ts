import { useThree } from "@react-three/fiber"
import CameraControls from "camera-controls"
import { useEffect } from "react"
import { Scene, Vector3 } from "three"
import useCurrentProject from "../hooks/useCurrentProject"

const position = new Vector3(0, 0, 0)
const focus = new Vector3(0, 0, 0)

function useInProject() {
  const { controls, scene }: { scene: Scene, controls: CameraControls | null } = useThree()
  const { hasCurrent: isInsideProject, project: projectName } = useCurrentProject()

  useEffect(() => {
    if(!isInsideProject || controls == null) return 

    const project = scene.getObjectByName(projectName)

    if(project == null) {
      console.warn("isInsideProject: no project detected", { params: projectName })
      return
    }
    
    project.localToWorld(position.set(0, 0, 2))
    project.localToWorld(focus.set(0, 0, 1))
    controls.setLookAt(...position.toArray(), ...focus.toArray(), true)
      
  }, [isInsideProject, scene, controls, projectName])

  return { isInsideProject }
}

export default useInProject