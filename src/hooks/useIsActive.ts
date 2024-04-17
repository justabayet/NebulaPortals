import { useRoute } from 'wouter'
import { useRoomData } from '../provider/RoomDataProvider'

function useIsActive() {
  const { name } = useRoomData()
  const [, params] = useRoute('current/:name')
  return params?.name === name
}


export default useIsActive