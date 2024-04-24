import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useMemo, useState } from 'react'
import { useLocation } from 'wouter'
import { useIsActive } from '../hooks'

class RoomData {
  constructor(
    public name: string,
    public isDisplayed: boolean,
    public setIsDisplayed: Dispatch<SetStateAction<boolean>>,
    public isActive: boolean,
    public setLocation: (to: string) => void) { }
}

const RoomDataContext = createContext(new RoomData('default', false, () => { }, false, () => { }))

interface RoomDataProviderProps extends PropsWithChildren {
  name: string
}

export const RoomDataProvider = ({ children, name }: RoomDataProviderProps): JSX.Element => {
  const [isDisplayed, setIsDisplayed] = useState(false)
  const [, setLocation] = useLocation()
  const isActive = useIsActive(name)

  const value = useMemo(() => new RoomData(name, isDisplayed, setIsDisplayed, isActive, setLocation), [name, isDisplayed, isActive, setLocation])

  return (
    <RoomDataContext.Provider value={value}>
      {children}
    </RoomDataContext.Provider>
  )
}

export const useRoomData = () => {
  return useContext(RoomDataContext)
}
