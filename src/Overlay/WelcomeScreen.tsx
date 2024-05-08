import { useRoomReady } from '../provider/RoomReadyProvider'
import './WelcomeScreen.css'
import ClickCTA from './ClickCTA'

interface WelcomeScreenProps {
  hasStarted: boolean
  setHasStarted: React.Dispatch<React.SetStateAction<boolean>>
}

function WelcomeScreen({ hasStarted, setHasStarted }: WelcomeScreenProps): JSX.Element {
  const { allReady: showIndicator } = useRoomReady()

  return (
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
      {showIndicator ? <span>Bonjour</span> : <span id='loading-text' />}

      <div>
        <ClickCTA style={{ opacity: showIndicator ? 1 : 0, transition: 'opacity 1.5s' }} />
      </div>
    </div>
  )
}

export default WelcomeScreen