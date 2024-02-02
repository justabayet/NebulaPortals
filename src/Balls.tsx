import { useLayoutEffect, useRef } from "react"
import { InstancedMesh, Matrix4 } from "three"

const NB_FLOORS = 40
const NB_CIRCLES = 3
const NB_BALLS = 2

const MIN_RADIUS = 4
const DISTANCE_IN_BETWEEN = 5

const POSITIONS: Array<[number, number, number]> = []

for (let floorId = 0; floorId < NB_FLOORS; floorId++) {
  for (let circleId = 0; circleId < NB_CIRCLES; circleId++) {
    const radius = MIN_RADIUS + circleId * DISTANCE_IN_BETWEEN

    for (let ballId = 0; ballId < NB_BALLS; ballId++) {
      const angle = Math.random() * Math.PI * 2
      const x = Math.cos(angle) * radius
      const z = Math.sin(-angle) * radius

      POSITIONS.push([x, floorId - (NB_FLOORS / 2), z])
    }
  }
}

function Balls(): JSX.Element {
  const ref = useRef<InstancedMesh>(null!)

  useLayoutEffect(() => {
    const matrix = new Matrix4()

    POSITIONS.forEach((position, index) => {
      matrix.setPosition(...position)
      ref.current.setMatrixAt(index, matrix)
    })
  }, [])

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, POSITIONS.length]}>
      <meshStandardMaterial color={"white"} emissive={"white"} emissiveIntensity={4} toneMapped={false} />
      <sphereGeometry args={[0.1]} />
    </instancedMesh>
  )
}

export default Balls