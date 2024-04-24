import { PortalMaterialType } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { RefObject, useEffect, useRef } from 'react'
import { useRoomData } from '../../provider/RoomDataProvider'
import { DELAY_ENTERING, DELAY_EXITING } from './const'


function useBlending(portalMaterial: RefObject<PortalMaterialType>) {
  const { setIsDisplayed, isActive } = useRoomData()

  const isBlend = useRef<boolean>(isActive)

  useFrame((_, dt) => {
    if (portalMaterial.current == null) return
    easing.damp(portalMaterial.current, 'blend', isBlend.current ? 1 : 0, 0.1, dt)

    setIsDisplayed(portalMaterial.current.blend > 0)
  })

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        isBlend.current = true
      }, DELAY_ENTERING)
    } else {
      setTimeout(() => {
        isBlend.current = false
      }, DELAY_EXITING)
    }
  }, [isActive])
}

export default useBlending