import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useMemo, useState } from 'react'

class InteractionState {
  constructor(
    public hasScrolled: boolean,
    public hasLookedAround: boolean,
    public hasEnteredRoom: boolean,
  ) { }
}
class SetInteractionState {
  constructor(
    public setHasScrolled: Dispatch<SetStateAction<boolean>>,
    public setHasLookedAround: Dispatch<SetStateAction<boolean>>,
    public setHasEnteredRoom: Dispatch<SetStateAction<boolean>>,
    public reset: () => void,
  ) { }
}

const InteractionStateContext = createContext(new InteractionState(false, false, false))
const SetInteractionStateContext = createContext(new SetInteractionState(() => { }, () => { }, () => { }, () => { }))

interface InteractionStateProviderProps extends PropsWithChildren { }

export const InteractionStateProvider = ({ children }: InteractionStateProviderProps): JSX.Element => {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [hasLookedAround, setHasLookedAround] = useState(false)
  const [hasEnteredRoom, setHasEnteredRoom] = useState(false)

  const value = useMemo(() => new InteractionState(
    hasScrolled,
    hasLookedAround,
    hasEnteredRoom,
  ), [hasScrolled, hasLookedAround, hasEnteredRoom])

  const setValue = useMemo(() => new SetInteractionState(
    setHasScrolled,
    setHasLookedAround,
    setHasEnteredRoom,
    () => {
      setHasScrolled(false)
      setHasLookedAround(false)
      setHasEnteredRoom(false)
    }
  ), [])

  return (
    <InteractionStateContext.Provider value={value}>
      <SetInteractionStateContext.Provider value={setValue}>
        {children}
      </SetInteractionStateContext.Provider>
    </InteractionStateContext.Provider>
  )
}

export const useInteractionState = () => {
  return useContext(InteractionStateContext)
}

export const useSetInteractionState = () => {
  return useContext(SetInteractionStateContext)
}
