import { useThree } from '@react-three/fiber'
import { useState, useEffect } from 'react'

function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false)

  const { events } = useThree()
  const htmlElement: HTMLElement | null = events.connected

  useEffect(() => {
    if(htmlElement == null) return

    setIsTouch(window.matchMedia('(any-hover: none)').matches)
    
    const disconnect = (event: PointerEvent) => {
      setIsTouch(event.pointerType === 'touch')
    }

    htmlElement.addEventListener('pointerdown', disconnect)

    return () => {
      htmlElement.removeEventListener('pointerdown', disconnect)
    }
  }, [htmlElement])

  return isTouch
}

export default useIsTouch