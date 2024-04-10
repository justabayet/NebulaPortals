import { useState, useEffect } from "react"

function useIsTouch(htmlElement: HTMLElement | null) {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if(htmlElement == null) return

    setIsTouch(window.matchMedia("(any-hover: none)").matches)
    
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