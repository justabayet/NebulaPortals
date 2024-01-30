import { useLayoutEffect, useRef } from "react"
import { InstancedMesh, Matrix4 } from "three"

const NB_FLOORS = 40
const NB_CIRCLES = 3
const NB_BALLS = 2

const MIN_RADIUS = 4
const DISTANCE_IN_BETWEEN = 5

function Balls(): JSX.Element {
  const ref = useRef<InstancedMesh>(null!)

  useLayoutEffect(() => {
    const matrix = new Matrix4()
    let i = 0

    for (let floorId = 0; floorId < NB_FLOORS; floorId++) {
      for (let circleId = 0; circleId < NB_CIRCLES; circleId++) {
        const radius = MIN_RADIUS + circleId * DISTANCE_IN_BETWEEN

        for (let ballId = 0; ballId < NB_BALLS; ballId++) {
          const angle = Math.random() * Math.PI * 2
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius

          matrix.setPosition(x, floorId - (NB_FLOORS / 2), z)
          ref.current.setMatrixAt(i, matrix)
          i++
        }
      }
    }
  }, [])

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, NB_FLOORS * NB_CIRCLES * NB_BALLS]}>
      <meshStandardMaterial color={"white"} emissive={"white"} emissiveIntensity={4} toneMapped={false} />
      <sphereGeometry args={[0.1]} />
    </instancedMesh>
  )
}

export default Balls