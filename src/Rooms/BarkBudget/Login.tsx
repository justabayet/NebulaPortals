import { Object3DProps } from '@react-three/fiber'
import { useRef } from 'react'
import { Object3D } from 'three'
import { Image, TiltableImage } from '../../Components'
import { login, google_button } from './assets'


function Login(props: Object3DProps): JSX.Element {
  const ref = useRef<Object3D>(null)

  return (
    <object3D {...props}>
      <object3D ref={ref} >
        <TiltableImage src={login} size={1.1} refToTilt={ref} />

        <Image src={google_button} position={[0, -0.3, 0.2]} size={0.2} radius={0.4} />
      </object3D>
    </object3D>
  )
}

export default Login