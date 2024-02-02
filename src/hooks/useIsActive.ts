import { useRoute } from "wouter"


function useIsActive(name: string) {
  const [, params] = useRoute('/current/:name')
  return params?.name === name
}


export default useIsActive