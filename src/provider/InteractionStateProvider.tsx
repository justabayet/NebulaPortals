import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useMemo, useState } from 'react'

class InteractionState {
  constructor(
    public hasScrolled: boolean,
    public setHasScrolled: Dispatch<SetStateAction<boolean>>,
    public hasLookedAround: boolean,
    public setHasLookedAround: Dispatch<SetStateAction<boolean>>,
    public hasEnteredRoom: boolean,
    public setHasEnteredRoom: Dispatch<SetStateAction<boolean>>
  ) { }
}

const InteractionStateContext = createContext(new InteractionState(false, () => { }, false, () => { }, false, () => { }))

interface InteractionStateProviderProps extends PropsWithChildren { }

export const InteractionStateProvider = ({ children }: InteractionStateProviderProps): JSX.Element => {
  const [hasEnteredRoom, setHasEnteredRoom] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [hasLookedAround, setHasLookedAround] = useState(false)

  const value = useMemo(() => new InteractionState(
    hasEnteredRoom, setHasEnteredRoom,
    hasScrolled, setHasScrolled,
    hasLookedAround, setHasLookedAround
  ), [hasEnteredRoom, hasScrolled, hasLookedAround])

  return (
    <InteractionStateContext.Provider value={value}>
      {children}
    </InteractionStateContext.Provider>
  )
}

export const useInteractionState = () => {
  return useContext(InteractionStateContext)
}