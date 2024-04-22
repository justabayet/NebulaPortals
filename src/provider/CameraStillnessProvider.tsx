import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useMemo, useState } from 'react'

class CameraStillness {
  constructor(
    public isCameraStill: boolean,
    public setIsCameraStill: Dispatch<SetStateAction<boolean>>,

  ) { }
}

const CameraStillnessContext = createContext(new CameraStillness(true, () => { }))

interface CameraStillnessProviderProps extends PropsWithChildren { }

export const CameraStillnessProvider = ({ children }: CameraStillnessProviderProps): JSX.Element => {
  const [isCameraStill, setIsCameraStill] = useState(true)

  const value = useMemo(() => new CameraStillness(
    isCameraStill, setIsCameraStill,
  ), [isCameraStill])

  return (
    <CameraStillnessContext.Provider value={value}>
      {children}
    </CameraStillnessContext.Provider>
  )
}

export const useCameraStillnessContext = () => {
  return useContext(CameraStillnessContext)
}
