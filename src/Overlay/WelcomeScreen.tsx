import { useCallback, useState } from 'react'
import './WelcomeScreen.css'
import { ClickOneFinger } from '../Components/AnimatedIcons'


function WelcomeScreen(): JSX.Element {
  const [isShown, setIsShown] = useState<boolean>(true)

  const onClick = useCallback(() => {
    setIsShown(false)
  }, [])

  return (
    <div
      className='welcome-screen'
      onClick={(onClick)}
      style={isShown ? {
        cursor: 'pointer',
        pointerEvents: 'auto',
        opacity: 1
      } : {
        cursor: 'auto',
        pointerEvents: 'none',
        opacity: 0
      }}>
      <span>Bonjour</span>

      <div>
        <ClickOneFinger theme='light' style={{ width: '35px' }} />
      </div>
    </div>
  )
}

export default WelcomeScreen