import { PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from 'react'
import { RoomType } from '../Rooms/type'

export const roomsConfig: RoomType[] = [
  'BarkBudget',
  'LolRoom'
]

const NB_EXTRA_ROOMS = 3

for (let i = 1; i <= NB_EXTRA_ROOMS; i++) {
  roomsConfig.push('IncomingRoom')
}

roomsConfig.push('LinkedIn')
roomsConfig.push('Email')
roomsConfig.push('Github')

const NB_ROOMS = roomsConfig.length

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

    console.log(`Room ${name} is ready. ${nbRoomsReady}/${NB_ROOMS}`)

    setAllReady(NB_ROOMS == nbRoomsReady)
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
