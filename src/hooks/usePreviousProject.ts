import { useRoute } from 'wouter'

function usePreviousProject (): { hasPrevious: true, project: string } | { hasPrevious: false, project: undefined } {
  const [hasPrevious, params] = useRoute('previous/:project')

  if(hasPrevious) {
    return {
      hasPrevious,
      project: params?.project
    }
  } else {
    return {
      hasPrevious,
      project: undefined
    }
  }
}

export default usePreviousProject