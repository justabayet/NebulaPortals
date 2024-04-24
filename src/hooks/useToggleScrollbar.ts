import { useEffect } from 'react'
import useCurrentProject from './useCurrentProject'


function showScrollbar() {
  document.documentElement.style.setProperty('--scrollbar-foreground', '#dddddd77')
}

function hideScrollbar() {
  document.documentElement.style.setProperty('--scrollbar-foreground', '#00000000')
}

export default function useToggleScrollbar() {
  const { hasCurrent: isInsideProject } = useCurrentProject()
  
  useEffect(() => {
    isInsideProject ? hideScrollbar() : showScrollbar()
  }, [isInsideProject])
}
