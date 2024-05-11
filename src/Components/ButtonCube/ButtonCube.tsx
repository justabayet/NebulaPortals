// Icon asset from https://www.flaticon.com/free-icons/share Share icons created by IconKanan - Flaticon
import { Object3DProps, useFrame } from '@react-three/fiber'
import { BackSide, BoxGeometry, LineBasicMaterial, Object3D, Vector3 } from 'three'
import Image from '../Image'
import { useMemo, useRef, useState } from 'react'

import githubLogo from './github.webp'
import redirectLogo from './redirect.webp'
import emailLogo from './email.webp'
import linkedinLogo from './linkedin_no_bg.webp'
import MeshHoverable from '../MeshHoverable'
import { easing } from 'maath'

type Variant = 'github' | 'redirect' | 'linkedin' | 'email'

const variants: Record<Variant, string> = {
  'github': githubLogo,
  'redirect': redirectLogo,
  'linkedin': linkedinLogo,
  'email': emailLogo
}

export interface ButtonCubeProps extends Object3DProps {
  url: string
  text?: string
  variant?: Variant
  cornerRadius?: number
  logoScale?: number
  isLogoBasicMaterial?: boolean
}

const rotationAxis = (new Vector3(0, 1, 0)).normalize()

function ButtonCube({ variant, url, text, logoScale = 1, cornerRadius = 0.49, isLogoBasicMaterial = false, ...props }: ButtonCubeProps): JSX.Element {
  const urlText = text ?? `Open ${url} in a new tab?`
  const cube = useRef<Object3D>(null)
  const cubeSize = 0.1
  const cubeGeometry = useMemo(() => new BoxGeometry(cubeSize, cubeSize, cubeSize), [])
  const lineMaterial = useRef<LineBasicMaterial>(null)

  const [hover, setHover] = useState<boolean>(false)

  useFrame((_, delta) => {
    if (cube.current != null) {
      const ROTATION_SPEED = hover ? 1 : 0.2
      cube.current.rotateOnWorldAxis(rotationAxis, delta * ROTATION_SPEED)
    }

    if (lineMaterial.current != null) {
      easing.damp(lineMaterial.current, 'opacity', hover ? 0.9 : 0.3, 0.1, delta)
    }
  })

  return (
    <object3D {...props}>
      {/* logo */}
      {variant != null && <Image src={variants[variant]} size={0.1 * logoScale} radius={cornerRadius} isBasicMaterial={isLogoBasicMaterial} />}

      {/* cube */}
      <object3D ref={cube} rotation={[Math.PI / 4, Math.PI / 4, Math.PI / 4]}>
        {/* edges */}
        <lineSegments>
          <edgesGeometry args={[cubeGeometry]} />
          <lineBasicMaterial ref={lineMaterial} color={0xffffff} transparent opacity={0.3} />
        </lineSegments>

        {/* faces */}
        <MeshHoverable geometry={cubeGeometry}
          onClick={() => {
            if (window.confirm(urlText))
              window.open(url, '_blank')
          }}
          onPointerOver={() => { setHover(true) }}
          onPointerOut={() => { setHover(false) }}>
          <meshBasicMaterial color={0xffffff} transparent opacity={0.1} side={BackSide} />
        </MeshHoverable>
      </object3D>
    </object3D>
  )
}

export default ButtonCube