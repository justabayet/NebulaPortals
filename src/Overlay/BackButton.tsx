import { useLocation } from 'wouter'
import './BackButton.css'
import useCurrentProject from '../hooks/useCurrentProject'
import backImage from './back.png'

function BackButton(): JSX.Element | undefined {
  const { hasCurrent: isVisible, project } = useCurrentProject()
  const [, setLocation] = useLocation()

  return (
    <div className='button'
      onClick={(e) => {
        if (!isVisible) return
        e.stopPropagation()
        setLocation('previous/' + project)
      }}
      style={{
        opacity: isVisible ? 0.8 : 0,
        cursor: isVisible ? 'pointer' : 'auto'
      }}>
      <img src={backImage}
        style={{ width: '5em' }} />
    </div>
  )
}

export default BackButton