import { Canvas } from '@react-three/fiber'
import './App.css'
import { Vector3 } from 'three'
import { CameraControls, Stats } from '@react-three/drei'
import Balls from './Balls'
import Door from './Door'

function Body() {
  // const { controls } = useThree();
  // (controls as unknown as CameraControls).setLookAt()

  return (
    <>
      <ambientLight intensity={0.5} />
      <Balls />
      <Door />
    </>
  )

}
function App() {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: new Vector3(2, 0, 0) }}>

        <Body />
        <CameraControls />
        <Stats />
      </Canvas>
    </div>
  )
}

export default App
