import { useLocation } from 'wouter'
import { useCurrentProject } from '../hooks'
import './BackButton.css'

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
      {'<- Back'}
    </div>
  )
}

export default BackButton