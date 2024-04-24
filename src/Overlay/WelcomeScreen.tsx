import './WelcomeScreen.css'
import { ClickOneFinger } from 'animated-icons'
import { useEffect, useState } from 'react'

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
        <ClickOneFinger theme='light' style={{ width: '35px', opacity: showIndicator ? 1 : 0, transition: 'opacity 1.5s' }} />
      </div>
    </div>
  )
}

export default WelcomeScreen