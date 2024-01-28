import { Canvas } from '@react-three/fiber'
import './App.css'
import { ACESFilmicToneMapping, DoubleSide, Euler, Vector3 } from 'three'
import { CameraControls, MeshPortalMaterial, Stats } from '@react-three/drei'
import Room from './Room'
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing'
import Balls from './Balls'

function Body() {

  return (
    <>
      <ambientLight intensity={0.5} />
      <Balls />

      <mesh castShadow receiveShadow position={new Vector3(-1, 0, 0)} rotation={new Euler(0, Math.PI / 2, 0)}>
        <planeGeometry args={[1, 2]} />
        <meshBasicMaterial color={"red"} />
        <MeshPortalMaterial side={DoubleSide} blend={0} >
          <Room position={new Vector3(0.5, 0, 0)} />

        </MeshPortalMaterial>
      </mesh>
    </>
  )

}
function App() {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: new Vector3(2, 0, 0) }}>
        <EffectComposer disableNormalPass>
          <Bloom mipmapBlur luminanceThreshold={1} levels={8} intensity={0.3} />
          <ToneMapping mode={ACESFilmicToneMapping} />
        </EffectComposer>

        <Body />
        <CameraControls />
        <Stats />
      </Canvas>
    </div>
  )
}

export default App
