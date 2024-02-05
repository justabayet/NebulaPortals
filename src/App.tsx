import { Canvas } from '@react-three/fiber'
import './App.css'
import Balls from './Balls'
import Controls, { CAMERA_DEFAULT_POSITION } from './Controls'
import { ROOM_ANGLE, ROOM_DEFAULT_POSITION, ROOM_Y_DIFFERENCE, rooms } from './Rooms'
import { Y_AXIS } from './const'

function App() {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: CAMERA_DEFAULT_POSITION }}>

        <ambientLight intensity={0.5} />
        <Balls />

        {rooms.map((Room, index) => {
          const angle = -ROOM_ANGLE * index
          const position = ROOM_DEFAULT_POSITION
            .clone()
            .applyAxisAngle(Y_AXIS, angle)
            .setY(-index * ROOM_Y_DIFFERENCE)

          return <Room key={index} position={position.toArray()} index={index} />
        })}

        <Controls />
      </Canvas>
    </div>
  )
}

export default App
