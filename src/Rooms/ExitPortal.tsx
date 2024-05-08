import { Balls, MeshHoverable } from '../Components'
import { DoubleSide } from 'three'
import { useRoomData } from '../provider/RoomDataProvider'
import { Suspense, lazy } from 'react'

const MeshPortalMaterial = lazy(() => import('../Components/MeshPortalMaterial'))

interface ExitPortalProps {
  position: [number, number, number]
  isVisible: boolean
}

function ExitPortal({ position, isVisible }: ExitPortalProps): JSX.Element {
  const { name, setLocation } = useRoomData()

  return (
    <MeshHoverable
      position={position}
      onClick={(e) => {
        if (!isVisible) return
        e.stopPropagation()
        setLocation('previous/' + name)
      }}
      enabledCursor={isVisible}>

      <planeGeometry args={[3, 12]} />

      <Suspense>
        <MeshPortalMaterial side={DoubleSide} worldUnits={true} isVisible={isVisible}>
          <color attach="background" args={['#030303']} />
          <Balls />
        </MeshPortalMaterial>
      </Suspense>
    </MeshHoverable>
  )
}

export default ExitPortal