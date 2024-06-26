import { useLayoutEffect, useRef } from 'react'
import { ColorRepresentation, InstancedMesh, Matrix4 } from 'three'

const NB_FLOORS = 40
const NB_CIRCLES = 3
const NB_BALLS = 2

const MIN_RADIUS = 4
const DISTANCE_IN_BETWEEN = 5

const BALLS_POSITIONS: Array<[number, number, number]> = []

for (let floorId = 0; floorId < NB_FLOORS; floorId++) {
  for (let circleId = 0; circleId < NB_CIRCLES; circleId++) {
    const radius = MIN_RADIUS + circleId * DISTANCE_IN_BETWEEN

    for (let ballId = 0; ballId < NB_BALLS; ballId++) {
      const angle = Math.random() * Math.PI * 2
      const x = Math.cos(angle) * radius
      const z = Math.sin(-angle) * radius

      BALLS_POSITIONS.push([x, floorId - (NB_FLOORS / 2), z])
    }
  }
}

interface BallsProps {
  color?: ColorRepresentation
}

function Balls({ color = 'white' }: BallsProps): JSX.Element {
  const ref = useRef<InstancedMesh>(null!)

  useLayoutEffect(() => {
    const matrix = new Matrix4()

    BALLS_POSITIONS.forEach((position, index) => {
      matrix.setPosition(...position)
      ref.current.setMatrixAt(index, matrix)
    })
  }, [])

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, BALLS_POSITIONS.length]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={4} toneMapped={false} />
      <sphereGeometry args={[0.1]} />
    </instancedMesh>
  )
}

export default Balls