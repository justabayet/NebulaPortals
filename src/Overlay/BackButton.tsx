import { useLocation } from 'wouter'
import useCurrentProject from '../hooks/useCurrentProject'
import './BackButton.css'

function BackButton(): JSX.Element | undefined {
  const { hasCurrent, project } = useCurrentProject()
  const [, setLocation] = useLocation()

  if (!hasCurrent) return

  return (
    <div className='button' onClick={(e) => (e.stopPropagation(), setLocation('previous/' + project))}>
      {'<- Back'}
    </div>
  )
}

export default BackButton