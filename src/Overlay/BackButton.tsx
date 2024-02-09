import { useLocation } from 'wouter'
import useCurrentProject from '../hooks/useCurrentProject'

function BackButton(): JSX.Element | undefined {
  const { hasCurrent, project } = useCurrentProject()
  const [, setLocation] = useLocation()

  if (!hasCurrent) return

  return (
    <div style={{
      position: 'absolute',
      top: '2vh',
      left: '2vh',
      color: 'white',
      opacity: 0.8,
      zIndex: 1,
      cursor: 'pointer'
    }} onClick={(e) => (e.stopPropagation(), setLocation('previous/' + project))}>
      {'<- Back'}
    </div>
  )
}

export default BackButton