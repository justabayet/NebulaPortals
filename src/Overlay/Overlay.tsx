import { Suspense, useState } from 'react'
import BackButton from './BackButton'
import InteractionIndicator from './InteractionIndicator'
import WelcomeScreen from './WelcomeScreen'
import Contact from './Contact'
import Title from './Title'

function Overlay(): JSX.Element {
  const [hasStarted, setHasStarted] = useState<boolean>(false)
  return (
    <>
      <BackButton />
      <WelcomeScreen hasStarted={hasStarted} setHasStarted={setHasStarted} />
      <Suspense>
        {hasStarted && <InteractionIndicator />}
      </Suspense>
      <Contact />
      <Title />
    </>
  )
}

export default Overlay
