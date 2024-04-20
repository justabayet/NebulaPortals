import './WelcomeScreen.css'
import { ClickOneFinger } from '../Components/AnimatedIcons'

interface WelcomeScreenProps {
  hasStarted: boolean
  setHasStarted: React.Dispatch<React.SetStateAction<boolean>>
}

function WelcomeScreen({ hasStarted, setHasStarted }: WelcomeScreenProps): JSX.Element {
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
        <ClickOneFinger theme='light' style={{ width: '35px' }} />
      </div>
    </div>
  )
}

export default WelcomeScreen