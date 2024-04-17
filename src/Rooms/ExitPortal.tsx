import { MeshPortalMaterial, Balls, MeshHoverable } from '../Components'
import { DoubleSide } from 'three'
import { useLocation } from 'wouter'
import { useRoomData } from '../provider/RoomDataProvider'
import { Suspense } from 'react'

interface ExitPortalProps {
  position: [number, number, number]
}

function ExitPortal({ position }: ExitPortalProps): JSX.Element {
  const [, setLocation] = useLocation()
  const { name } = useRoomData()

  return (
    <MeshHoverable
      position={position}
      onClick={(e) => {
        e.stopPropagation()
        setLocation('previous/' + name)
      }}>

      <planeGeometry args={[3, 12]} />

      <Suspense>
        <MeshPortalMaterial side={DoubleSide} worldUnits={true}>
          <color attach="background" args={['#030303']} />
          <Balls />
        </MeshPortalMaterial>
      </Suspense>
    </MeshHoverable>
  )
}

export default ExitPortal