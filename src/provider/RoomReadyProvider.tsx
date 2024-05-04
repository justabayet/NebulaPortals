import { PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from 'react'
import { rooms } from '../Rooms'

class RoomReady {
  constructor(
    public setRoomReady: (name: string) => void,
    public allReady: boolean,
  ) { }
}

const RoomReadyContext = createContext(new RoomReady(() => { }, false))

const roomStates: Record<string, boolean> = {}

export const RoomReadyProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [allReady, setAllReady] = useState<boolean>(false)

  const setRoomReady = useCallback((name: string) => {
    roomStates[name] = true

    const nbRoomsReady = Object.values(roomStates).filter((roomState) => roomState).length

    console.log(`Room ${name} is ready. ${nbRoomsReady}/${rooms.length}`)

    setAllReady(rooms.length == nbRoomsReady)
  }, [])


  const value = useMemo(() => new RoomReady(
    setRoomReady,
    allReady
  ), [setRoomReady, allReady])

  return (
    <RoomReadyContext.Provider value={value}>
      {children}
    </RoomReadyContext.Provider>
  )
}

export const useRoomReady = () => {
  return useContext(RoomReadyContext)
}
