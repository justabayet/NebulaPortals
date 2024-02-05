import { useState, useEffect } from "react"

function useIsTouch(htmlElement: HTMLElement | null) {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if(htmlElement == null) return
    
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