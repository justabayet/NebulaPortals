import { MeshPortalMaterial } from "@react-three/drei"
import { Vector3, DoubleSide } from "three"
import Balls from "./Balls"
import MeshHoverable from "./MeshHoverable"
import { useLocation } from "wouter"

interface ExitPortalProps {
  roomName: string
  position: Vector3
}

function ExitPortal({ roomName, position }: ExitPortalProps): JSX.Element {
  const [, setLocation] = useLocation()

  return (
    <MeshHoverable position={position}
      onClick={(e) => (e.stopPropagation(), setLocation('/previous/' + roomName))}>
      <planeGeometry args={[1, 1]} />
      <MeshPortalMaterial side={DoubleSide} worldUnits={true}>
        <color attach="background" args={["#131313"]} />
        <Balls />
      </MeshPortalMaterial>
    </MeshHoverable>
  )
}

export default ExitPortal