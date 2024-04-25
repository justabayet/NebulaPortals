import { Canvas } from '@react-three/fiber'
import './App.css'
import { Balls } from './Components'
import Controls, { CAMERA_DEFAULT_POSITION } from './Controls'
import { getRoomArgs, rooms } from './Rooms'
import { Suspense } from 'react'
import { useSetInteractionState } from './provider/InteractionStateProvider'
import { Stats } from '@react-three/drei/core/Stats'

function App(): JSX.Element {
  const { setHasWhelled } = useSetInteractionState()

  return (
    <div id="canvas-container">
      <Suspense>
        <Canvas camera={{ position: CAMERA_DEFAULT_POSITION }} shadows onWheel={() => {
          setHasWhelled(true)
        }}>
          <Balls />

          {rooms.map((Room, index) =>
            <Room key={index} index={index} {...getRoomArgs(index)} />)}

          <Controls />
        </Canvas>
        <Stats></Stats>
      </Suspense>
    </div>
  )
}

export default App
