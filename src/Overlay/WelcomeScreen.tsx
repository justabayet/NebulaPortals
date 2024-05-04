import { useRoomReady } from '../provider/RoomReadyProvider'
import './WelcomeScreen.css'
import { Suspense, lazy, useEffect, useState } from 'react'

const ClickOneFingerBigLight = lazy(() => import('../Components/LazyAnimatedIcons/ClickOneFingerBigLight'))

interface WelcomeScreenProps {
  hasStarted: boolean
  setHasStarted: React.Dispatch<React.SetStateAction<boolean>>
}

function WelcomeScreen({ hasStarted, setHasStarted }: WelcomeScreenProps): JSX.Element {
  const { allReady: showIndicator } = useRoomReady()

  return (
    <Suspense fallback={
      <div
        className='welcome-screen'
        style={{
          cursor: 'auto',
          pointerEvents: 'auto',
          opacity: 1
        }}>
        <LoadingText />
        <div style={{ height: '38.5px' }} />
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
          cursor: showIndicator ? 'pointer' : 'auto',
          pointerEvents: showIndicator ? 'auto' : 'none',
          opacity: 1
        }}>
        {showIndicator ? <span>Bonjour</span> : <LoadingText />}

        <div>
          <ClickOneFingerBigLight style={{ width: '35px', opacity: showIndicator ? 1 : 0, transition: 'opacity 1.5s' }} />
        </div>
      </div>
    </Suspense>
  )
}

function LoadingText(): JSX.Element {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setCounter(c => c + 1), 1200)

    return () => clearInterval(interval)
  }, [])

  const dots = '.'.repeat((counter % 3) + 1)

  return <span>Loading{dots}</span>
}

export default WelcomeScreen