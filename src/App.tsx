import { Canvas } from '@react-three/fiber'
import './App.css'
import { Vector3 } from 'three'
import { Stats } from '@react-three/drei'
import Balls from './Balls'
import ControlledCamera from './ControlledCamera'
import Room from './Room'

function Body() {
  return (
    <object3D position={new Vector3(0, 0, 0)}>
      <ambientLight intensity={0.5} />
      <Balls />

      <Room position={new Vector3(1, 1, -2)} name='top' />
      <Room position={new Vector3(3, 0, 0)} name='middle' />
      <Room position={new Vector3(1, -1, 2)} name='bot' />
    </object3D>
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
