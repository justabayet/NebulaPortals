import { Canvas } from '@react-three/fiber'
import './App.css'
import { Vector3 } from 'three'
import { Stats } from '@react-three/drei'
import Balls from './Balls'
import Door from './Door'
import ControlledCamera from './ControlledCamera'

function Body() {
  return (
    <>
      <ambientLight intensity={0.5} />

      <object3D position={new Vector3(0, 0, 0)}>
        <Balls />
        <Door position={new Vector3(-1, 2, 2)} name='top' />
        <Door position={new Vector3(2, 0, 1)} name='middle' />
        <Door position={new Vector3(-1, -2, -2)} name='bot' />
      </object3D>
    </>
  )
}

function App() {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: new Vector3(-2, 0, 0) }}>

        <Body />

        <ControlledCamera />
        <Stats />
      </Canvas>
    </div>
  )
}

export default App
