import { Canvas } from '@react-three/fiber'
import './App.css'
import { Balls } from './Components'
import Controls, { CAMERA_DEFAULT_POSITION } from './Controls'
import { getRoomArgs, rooms } from './Rooms'
import { Dispatch, SetStateAction, Suspense, memo } from 'react'
import { useSetInteractionState } from './provider/InteractionStateProvider'

const Appli = memo(function Appli({ setHasWhelled }: { setHasWhelled: Dispatch<SetStateAction<boolean>> }): JSX.Element {
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
      </Suspense>
    </div>
  )
})

function App() {
  const { setHasWhelled } = useSetInteractionState()

  return <Appli setHasWhelled={setHasWhelled} />
}

export default App
