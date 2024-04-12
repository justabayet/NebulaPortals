import { useThree } from '@react-three/fiber'
import CameraControls from 'camera-controls'
import { useEffect } from 'react'
import { Scene } from 'three'
import { DEFAULT_POSITION } from './useDefault'
import { useScroll } from '@react-three/drei'
import { rooms } from '../../Rooms/const'
import usePreviousProject from '../../hooks/usePreviousProject'


function useExitingProject() {
  const { controls, scene }: { scene: Scene, controls: CameraControls | null } = useThree()
  const { hasPrevious: isExitingProject, project: projectName } = usePreviousProject()

  const scrollState = useScroll()

  useEffect(() => {
    if(!isExitingProject || controls == null) return

    const project = scene.getObjectByName(projectName)

    if(project == null) {
      console.warn('isExitingProject: no project detected', { params: projectName })
      return
    }

    const scrollRatio = project.userData.index / (rooms.length - 1)
    const scrollValue = scrollState.el.children[1].scrollHeight * scrollRatio
    scrollState.el.scrollTop = scrollValue

    const y = project.position.y
    const newPosition = project.position.clone()
      .setY(0)
      .normalize()
      .multiplyScalar(DEFAULT_POSITION.length())
      .multiplyScalar(-1)
      .setY(y)

    const focus: [number, number, number] = [0, y, 0]
    controls.setLookAt(...newPosition.toArray(), ...focus, true)

  }, [isExitingProject, controls, scene, projectName, scrollState])

  return {
    isExitingProject
  }
}

export default useExitingProject