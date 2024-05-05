// Icon asset from https://www.flaticon.com/free-icons/share Share icons created by IconKanan - Flaticon
import { Object3DProps, useFrame } from '@react-three/fiber'
import { BackSide, BoxGeometry, Object3D, Vector3 } from 'three'
import Image from '../Image'
import { useMemo, useRef } from 'react'

import githubLogo from './github.png'
import redirectLogo from './redirect.png'
import linkedinLogo from './linkedin_no_bg.png'
import MeshHoverable from '../MeshHoverable'

type Variant = 'github' | 'redirect' | 'linkedin'

const variants: Record<Variant, string> = {
  'github': githubLogo,
  'redirect': redirectLogo,
  'linkedin': linkedinLogo
}

interface ButtonCubeProps extends Object3DProps {
  url: string
  text?: string
  variant?: Variant
}

const rotationAxis = (new Vector3(0, 1, 0)).normalize()

function ButtonCube({ variant, url, text, ...props }: ButtonCubeProps): JSX.Element {
  const urlText = text ?? `Open ${url} in a new tab?`
  const cube = useRef<Object3D>(null)
  const cubeSize = 0.1
  const cubeGeometry = useMemo(() => new BoxGeometry(cubeSize, cubeSize, cubeSize), [])

  useFrame((_, delta) => {
    if (cube.current == null) return
    cube.current.rotateOnWorldAxis(rotationAxis, delta / 5)
  })

  return (
    <object3D {...props}>
      {/* logo */}
      {variant != null && <Image src={variants[variant]} size={0.1} radius={0.49} />}

      {/* cube */}
      <object3D ref={cube} rotation={[0, Math.PI / 4, Math.PI / 4]}>
        {/* edges */}
        <lineSegments>
          <edgesGeometry args={[cubeGeometry]} />
          <lineBasicMaterial color={0xffffff} transparent opacity={0.3} />
        </lineSegments>

        {/* faces */}
        <MeshHoverable geometry={cubeGeometry} onClick={() => {
          if (window.confirm(urlText))
            window.open(url, '_blank')
        }}>
          <meshBasicMaterial color={0xffffff} transparent opacity={0.1} side={BackSide} />
        </MeshHoverable>
      </object3D>
    </object3D>
  )
}

export default ButtonCube