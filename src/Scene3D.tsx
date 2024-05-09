import { Canvas } from '@react-three/fiber'
import './Scene3D.css'
import { Balls } from './Components'
import Controls, { CAMERA_DEFAULT_POSITION } from './Controls'
import { getRoomArgs, rooms } from './Rooms'
import { Suspense } from 'react'

function Scene3D(): JSX.Element {
  return (
    <div id="canvas-container">
      <Suspense>
        <Canvas camera={{ position: CAMERA_DEFAULT_POSITION }} shadows >
          <Balls />

          {rooms.map((Room, index) =>
            <Room key={index} index={index} {...getRoomArgs(index)} />)}

          <Controls />
        </Canvas>
      </Suspense>
    </div>
  )
}

export default Scene3D
