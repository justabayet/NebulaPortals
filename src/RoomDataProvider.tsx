import { PropsWithChildren, createContext, useContext, useMemo } from 'react'

class RoomData {
  constructor(
    public name: string) { }
}

const RoomDataContext = createContext(new RoomData('default'))

interface RoomDataProviderProps extends PropsWithChildren {
  name: string
}

export const RoomDataProvider = ({ children, name }: RoomDataProviderProps): JSX.Element => {
  const value = useMemo(() => new RoomData(name), [name])

  return (
    <RoomDataContext.Provider value={value}>
      {children}
    </RoomDataContext.Provider>
  )
}

export const useRoomData = () => {
  return useContext(RoomDataContext)
}
