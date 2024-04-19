import { Canvas } from '@react-three/fiber'
import './App.css'
import { Balls } from './Components'
import Controls, { CAMERA_DEFAULT_POSITION } from './Controls'
import { getRoomArgs, rooms } from './Rooms'
import { Suspense } from 'react'

function App() {
  return (
    <div id="canvas-container">
      <Suspense>
        <Canvas camera={{ position: CAMERA_DEFAULT_POSITION }} >
          <Balls />

          {rooms.map((Room, index) =>
            <Room key={index} index={index} {...getRoomArgs(index)} />)}

          <Controls />
        </Canvas>
      </Suspense>
    </div>
  )
}

export default App
