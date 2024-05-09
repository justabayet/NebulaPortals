import { Suspense, useEffect, useState } from 'react'
import BackButton from './BackButton'
import InteractionIndicator from './InteractionIndicator'
import WelcomeScreen from './WelcomeScreen'
import { useSetInteractionState } from '../provider/InteractionStateProvider'

function Overlay(): JSX.Element {
  const [hasStarted, setHasStarted] = useState<boolean>(false)

  const { reset } = useSetInteractionState()

  useEffect(() => {
    if (hasStarted) reset()
  }, [reset, hasStarted])

  return (
    <>
      <BackButton />
      <WelcomeScreen hasStarted={hasStarted} setHasStarted={setHasStarted} />
      <Suspense>
        {hasStarted && <InteractionIndicator />}
      </Suspense>
    </>
  )
}

export default Overlay
