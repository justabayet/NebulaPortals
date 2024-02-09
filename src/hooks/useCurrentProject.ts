
import { useRoute } from "wouter"

function useCurrentProject (): { hasCurrent: true, project: string } | { hasCurrent: false, project: undefined } {
  const [hasCurrent, params] = useRoute('current/:project')

  if(hasCurrent) {
    return {
      hasCurrent,
      project: params?.project
    }
  } else {
    return {
      hasCurrent,
      project: undefined
    }
  }
}

export default useCurrentProject