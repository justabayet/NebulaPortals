import { Object3DProps } from '@react-three/fiber'
import { useRef } from 'react'
import { Object3D } from 'three'
import { Image, TiltableImage } from '../../Components'
import { home, graph, record, button, tabs } from './assets'

function HomePage(props: Object3DProps): JSX.Element {
  const ref = useRef<Object3D>(null)

  return (
    <object3D ref={ref} {...props}>
      <TiltableImage src={home} position={[0, 0, 0]} refToTilt={ref} />

      <Image src={graph} position={[0, 0.57, 0.2]} size={0.85} />

      <Image src={record} position={[0, 0.2, 0.1]} size={0.9} radius={0.06} />
      <Image src={record} position={[0, 0, 0.1]} size={0.9} radius={0.06} />
      <Image src={record} position={[0, -0.2, 0.1]} size={0.9} radius={0.06} />

      <Image src={button} position={[0.3, -0.62, 0.25]} size={0.2} radius={0.5} />
      <Image src={tabs} position={[0, -0.9, 0.1]} size={0.9} radius={0.06} />
    </object3D>
  )
}

export default HomePage