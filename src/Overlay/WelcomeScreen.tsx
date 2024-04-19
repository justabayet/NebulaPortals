import { useCallback, useState } from 'react'
import './WelcomeScreen.css'


function WelcomeScreen(): JSX.Element {
  const [isShown, setIsShown] = useState<boolean>(true)

  const onClick = useCallback(() => {
    setIsShown(false)
  }, [])

  return (
    <div
      className='welcome-screen'
      onClick={(onClick)}
      style={{
        cursor: isShown ? 'pointer' : 'auto',
        pointerEvents: isShown ? 'auto' : 'none',
        opacity: isShown ? 1 : 0
      }}>
      Bonjour
    </div>
  )
}

export default WelcomeScreen