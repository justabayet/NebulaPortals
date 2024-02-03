import { Canvas } from '@react-three/fiber'
import './App.css'
import { Vector3 } from 'three'
import { ScrollControls, Stats } from '@react-three/drei'
import Balls from './Balls'
import ControlledCamera from './ControlledCamera'
import DefaultContent, { RoomProps } from './Rooms/DefaultContent'
import BarkBudget from './Rooms/BarkBudget'

const rooms = [
  (props: RoomProps) => DefaultContent({ ...props, name: "red", color: "red" }),
  BarkBudget,
  (props: RoomProps) => DefaultContent({ ...props, name: "blue", color: "blue" }),
]

const DEFAULT_POSITION = new Vector3(3, 0, 0)
const AXIS = new Vector3(0, 1, 0)
const ANGLE = Math.PI / 4
const Y_DIFFERENCE = 2

function Body() {
  return (
    <object3D position={new Vector3(0, 0, 0)}>
      <ambientLight intensity={0.5} />
      <Balls />

      {rooms.map((Room, index) => {
        const angle = -ANGLE * index
        const position = DEFAULT_POSITION
          .clone()
          .applyAxisAngle(AXIS, angle)
          .setY(index * Y_DIFFERENCE)

        return <Room key={index} position={position} />
      })}
    </object3D>
  )
}

function App() {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: new Vector3(-2, 0, 0) }}>
        <ScrollControls pages={1}>

          <Body />

          <ControlledCamera />
        </ScrollControls>
        <Stats />
      </Canvas>
    </div>
  )
}

export default App
