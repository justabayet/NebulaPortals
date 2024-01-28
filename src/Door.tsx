import { MeshPortalMaterial } from "@react-three/drei"
import { Vector3, Euler, DoubleSide } from "three"
import Room from "./Room"

function Door(): JSX.Element {
  return (
    <mesh position={new Vector3(-1, 0, 0)} rotation={new Euler(0, Math.PI / 2, 0)}>
      <planeGeometry args={[1, 2]} />
      <meshBasicMaterial />
      <MeshPortalMaterial side={DoubleSide} blend={0}>
        <Room position={new Vector3(0, 0, 0)} />
      </MeshPortalMaterial>
    </mesh>
  )
}

export default Door