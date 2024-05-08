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
    public addImageReady: () => void,
    public allReady: boolean,
  ) { }
}

const RoomReadyContext = createContext(new RoomReady(() => { }, () => { }, false))

const roomStates: Record<string, boolean> = {}

const imagesToWait: string[] = [
  'BB:descriptionPanel',
  'BB:graph',
  'BB:home',
  'BB:login'
]
const NB_IMAGES = imagesToWait.length
let nbImagesReady: number = 0

export const RoomReadyProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [allRoomsReady, setAllRoomsReady] = useState<boolean>(NB_ROOMS === 0)
  const [allImagesReady, setAllImagesReady] = useState<boolean>(NB_IMAGES === 0)

  const setRoomReady = useCallback((name: string) => {
    roomStates[name] = true

    const nbRoomsReady = Object.values(roomStates).filter((roomState) => roomState).length

    setAllRoomsReady(NB_ROOMS === nbRoomsReady)
  }, [])

  const addImageReady = useCallback(() => {
    nbImagesReady += 1
    setAllImagesReady(NB_IMAGES <= nbImagesReady)
  }, [])

  const allReady = allRoomsReady && allImagesReady

  const value = useMemo(() => new RoomReady(
    setRoomReady,
    addImageReady,
    allReady
  ), [setRoomReady, addImageReady, allReady])

  return (
    <RoomReadyContext.Provider value={value}>
      {children}
    </RoomReadyContext.Provider>
  )
}

export const useRoomReady = () => {
  return useContext(RoomReadyContext)
}
