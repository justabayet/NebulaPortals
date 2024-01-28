import { useLayoutEffect, useMemo, useRef } from "react"
import { InstancedMesh, Matrix4, MeshStandardMaterial, SphereGeometry } from "three"

const NB_FLOORS = 30
const NB_CIRCLES = 5
const NB_BALLS = 3

const MIN_RADIUS = 6
const DISTANCE_IN_BETWEEN = 2

function Balls(): JSX.Element {
  const ref = useRef<InstancedMesh>(null!)

  const material = useMemo(() => new MeshStandardMaterial({ color: "white", emissive: "white", emissiveIntensity: 1, toneMapped: false }), [])
  const ballsGeometry = useMemo(() => new SphereGeometry(0.1), [])

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


  return <instancedMesh ref={ref} args={[ballsGeometry, material, NB_FLOORS * NB_CIRCLES * NB_BALLS]} />
}

export default Balls