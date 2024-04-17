import { PortalMaterialType } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { RefObject, useState, useEffect } from 'react'
import { useIsActive } from '../../hooks'
import { useRoomData } from '../../provider/RoomDataProvider'
import { DELAY_ENTERING, DELAY_EXITING } from './const'


function useBlending(portalMaterial: RefObject<PortalMaterialType>) {
  const isActive = useIsActive()
  const [isBlend, setIsBlend] = useState(isActive)

  const { setIsDisplayed } = useRoomData()
  useFrame((_, dt) => {
    if (portalMaterial.current == null) return
    easing.damp(portalMaterial.current, 'blend', isBlend ? 1 : 0, 0.1, dt)

    setIsDisplayed(portalMaterial.current.blend > 0)
  })

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setIsBlend(true)
      }, DELAY_ENTERING)
    } else {
      setTimeout(() => {
        setIsBlend(false)
      }, DELAY_EXITING)
    }
  }, [isActive])
}

export default useBlending