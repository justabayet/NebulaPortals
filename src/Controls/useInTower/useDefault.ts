import { useThree } from '@react-three/fiber'
import CameraControls from 'camera-controls'
import { useEffect } from 'react'
import { Vector3 } from 'three'
import { useCurrentProject, usePreviousProject } from '../../hooks'

const DEFAULT_POSITION = new Vector3(-2, 0, 0)
const DEFAULT_FOCUS: [number, number, number] = [0, 0, 0]
const DEFAULT_ANGLE = Math.PI * 1.5

function useDefault() {
  const { controls }: { controls: CameraControls | null } = useThree()
  const { hasPrevious: hasPreviousProject } = usePreviousProject()
  const { hasCurrent: isInsideProject } = useCurrentProject()

  const isDefault = !hasPreviousProject && !isInsideProject

  useEffect(() => {
    if(!isDefault || controls == null) return
      
    console.log('Use default camera position in tower')
    controls.setLookAt(...DEFAULT_POSITION.toArray(), ...DEFAULT_FOCUS, true)

  }, [isDefault, controls])

  return {
    isDefault
  }
}

export default useDefault

export {
  DEFAULT_POSITION,
  DEFAULT_ANGLE,
  DEFAULT_FOCUS
}