import './WelcomeScreen.css'
import { Suspense, lazy, useEffect, useState } from 'react'

const ClickOneFingerBigLight = lazy(() => import('../Components/LazyAnimatedIcons/ClickOneFingerBigLight'))

interface WelcomeScreenProps {
  hasStarted: boolean
  setHasStarted: React.Dispatch<React.SetStateAction<boolean>>
}

function WelcomeScreen({ hasStarted, setHasStarted }: WelcomeScreenProps): JSX.Element {

  const [showIndicator, setShowIndicator] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => setShowIndicator(true), 800)
  }, [])

  return (
    <Suspense fallback={
      <div
        className='welcome-screen'
        style={{
          cursor: 'auto',
          pointerEvents: 'auto',
          opacity: 1
        }}>
        <span>Bonjour</span>
        <div style={{ height: '35px' }} />
      </div>
    }>
      <div
        className='welcome-screen'
        onClick={() => setHasStarted(true)}
        style={hasStarted ? {
          cursor: 'auto',
          pointerEvents: 'none',
          opacity: 0
        } : {
          cursor: 'pointer',
          pointerEvents: 'auto',
          opacity: 1
        }}>
        <span>Bonjour</span>

        <div>
          <ClickOneFingerBigLight style={{ width: '35px', opacity: showIndicator ? 1 : 0, transition: 'opacity 1.5s' }} />
        </div>
      </div>
    </Suspense>
  )
}

export default WelcomeScreen