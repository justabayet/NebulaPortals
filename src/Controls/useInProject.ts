import { useThree } from "@react-three/fiber"
import CameraControls from "camera-controls"
import { useEffect } from "react"
import { Scene, Vector3 } from "three"
import { useRoute } from "wouter"

const position = new Vector3(0, 0, 0)
const focus = new Vector3(0, 0, 0)

function useInProject() {
  const { controls, scene }: { scene: Scene, controls: CameraControls | null } = useThree()
  const [isInsideProject, params] = useRoute('/current/:project')

  useEffect(() => {
    if(!isInsideProject || controls == null) return 

    console.log("isInsideProject")
    const project = scene.getObjectByName(params.project)

    if(project == null) {
      console.warn("isInsideProject: no project detected", { params: params.project })
      return
    }
    
    project.localToWorld(position.set(0, 0, 2))
    project.localToWorld(focus.set(0, 0, 1))
    controls.setLookAt(...position.toArray(), ...focus.toArray(), true)
      
  }, [isInsideProject, scene, controls, params?.project])
}

export default useInProject