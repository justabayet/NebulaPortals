import { useThree } from '@react-three/fiber'
import CameraControls from 'camera-controls'
import { useEffect } from 'react'
import { Scene, Vector3 } from 'three'
import { useCurrentProject } from '../hooks'
import { useSetInteractionState } from '../provider/InteractionStateProvider'

const position = new Vector3(0, 0, 0)
const focus = new Vector3(0, 0, 0)

function useInProject() {
  const { controls, scene }: { scene: Scene, controls: CameraControls | null } = useThree()
  const { hasCurrent: isInsideProject, project: projectName } = useCurrentProject()

  useEffect(() => {
    if(!isInsideProject || controls == null) return 

    const room = scene.getObjectByName(projectName)

    if(room == null) {
      console.warn('useInProject: no room detected for current project', { params: projectName })
      return
    }
    
    room.localToWorld(position.set(0, 0, -2))
    room.localToWorld(focus.set(0, 0, -3))
    controls.setLookAt(...position.toArray(), ...focus.toArray(), true)
      
  }, [isInsideProject, scene, controls, projectName])

  const { setHasLookedAround } = useSetInteractionState()
  useEffect(() => {
    if(!isInsideProject || controls == null) return

    const onTransitionStart = () => { setHasLookedAround(true) }

    controls.addEventListener('transitionstart', onTransitionStart)
    return () => {
      controls.removeEventListener('transitionstart', onTransitionStart)
    }
  }, [controls, isInsideProject, setHasLookedAround])

  return { isInsideProject }
}

export default useInProject