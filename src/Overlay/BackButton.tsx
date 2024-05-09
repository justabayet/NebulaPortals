import { useLocation } from 'wouter'
import './BackButton.css'
import useCurrentProject from '../hooks/useCurrentProject'
import backImage from './back.png'

function BackButton(): JSX.Element | undefined {
  const { hasCurrent: isVisible, project } = useCurrentProject()
  const [, setLocation] = useLocation()

  return (
    <img src={backImage}
      className='button'
      onClick={(e) => {
        if (!isVisible) return
        e.stopPropagation()
        setLocation('previous/' + project)
      }}
      style={{
        width: '5em',
        opacity: isVisible ? 0.8 : 0,
        cursor: isVisible ? 'pointer' : 'auto'
      }} />
  )
}

export default BackButton