import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useMemo, useState } from 'react'

class RoomData {
  constructor(
    public name: string,
    public isDisplayed: boolean,
    public setIsDisplayed: Dispatch<SetStateAction<boolean>>) { }
}

const RoomDataContext = createContext(new RoomData('default', false, () => { }))

interface RoomDataProviderProps extends PropsWithChildren {
  name: string
}

export const RoomDataProvider = ({ children, name }: RoomDataProviderProps): JSX.Element => {
  const [isDisplayed, setIsDisplayed] = useState(false)

  const value = useMemo(() => new RoomData(name, isDisplayed, setIsDisplayed), [name, isDisplayed])

  return (
    <RoomDataContext.Provider value={value}>
      {children}
    </RoomDataContext.Provider>
  )
}

export const useRoomData = () => {
  return useContext(RoomDataContext)
}
