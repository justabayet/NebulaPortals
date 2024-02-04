import { MeshPortalMaterial } from "@react-three/drei"
import { Vector3, DoubleSide } from "three"
import Balls from "../Balls"
import MeshHoverable from "../MeshHoverable"
import { useLocation } from "wouter"
import { useRoomData } from "../RoomDataProvider"

interface ExitPortalProps {
  position: Vector3
}

function ExitPortal({ position }: ExitPortalProps): JSX.Element {
  const [, setLocation] = useLocation()
  const { name } = useRoomData()

  return (
    <MeshHoverable position={position}
      onClick={(e) => (e.stopPropagation(), setLocation('/previous/' + name))}>
      <planeGeometry args={[12, 12]} />
      <MeshPortalMaterial side={DoubleSide} worldUnits={true}>
        <color attach="background" args={["#131313"]} />
        <Balls />
      </MeshPortalMaterial>
    </MeshHoverable>
  )
}

export default ExitPortal