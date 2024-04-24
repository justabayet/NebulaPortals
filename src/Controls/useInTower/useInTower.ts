import { CameraControls, useScroll } from '@react-three/drei'
import useDefault, { DEFAULT_FOCUS, DEFAULT_POSITION } from './useDefault'
import useExitingProject from './useExitingProject'
import { FULL_ANGLE, FULL_HEIGHT } from '../../Rooms/const'
import { useThree, useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { useRef } from 'react'
import { useSetInteractionState } from '../../provider/InteractionStateProvider'

const AXIS = new Vector3(0, 1, 0)

function useScrollControl(enabled = true) {
  const { controls }: { controls: CameraControls | null } = useThree()

  const { setHasScrolled } = useSetInteractionState()
  const scrollProgress = useRef(0)

  const scrollState = useScroll()
  useFrame(() => {
    if(!controls || !enabled) return

    const prevProgress = scrollProgress.current
    const newProgress = scrollState.el.scrollTop

    if(prevProgress != newProgress) {
      setHasScrolled(true)
      scrollProgress.current = scrollState.el.scrollTop

      const ratio = scrollState.el.scrollTop / scrollState.el.children[1].scrollHeight
      const newY = -FULL_HEIGHT * ratio
      const newAngle = -FULL_ANGLE * ratio

      const newFocus: [number, number, number] = [...DEFAULT_FOCUS]
      newFocus[1] = newY

      const newPosition = DEFAULT_POSITION.clone()
        .applyAxisAngle(AXIS, newAngle)
        .setY(newY)

      controls.setLookAt(...newPosition.toArray(), ...newFocus, true)
    }
    
  })
}

function useInTower() {
  const { isDefault } = useDefault()
  const { isExitingProject } = useExitingProject()

  useScrollControl(isDefault || isExitingProject)
}

export default useInTower