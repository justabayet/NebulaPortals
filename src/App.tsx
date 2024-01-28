import { Canvas, extend } from '@react-three/fiber'
import './App.css'
import { ACESFilmicToneMapping, Vector3 } from 'three'
import { CameraControls, Effects, Stats } from '@react-three/drei'
import Balls from './Balls'
import Door from './Door'
import { UnrealBloomPass } from 'three-stdlib'
import { OutputPass } from 'three/examples/jsm/Addons.js'

extend({ UnrealBloomPass, OutputPass })

function Body() {

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
        <Effects disableGamma>
          <unrealBloomPass threshold={1} strength={0.1} radius={1} />
          <outputPass args={[ACESFilmicToneMapping]} />
        </Effects>

        <Body />
        <CameraControls />
        <Stats />
      </Canvas>
    </div>
  )
}

export default App
