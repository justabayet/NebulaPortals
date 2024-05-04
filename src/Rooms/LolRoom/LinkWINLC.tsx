import { Object3DProps } from '@react-three/fiber'
import { Center } from '@react-three/drei/core/Center'
import { Text3D } from '@react-three/drei/core/Text3D'
import { Suspense } from 'react'
import { ButtonGithub, ButtonOpen } from '../../Components'

const gold = 0xC19D4D

const GITHUB_WINLC = 'https://github.com/justabayet/whenisnextlolclash'
const SITE_WINLC = 'https://whenisnextlolclash.justabayet.com/'

function LinkWINLC(props: Object3DProps): JSX.Element {
  return (
    <object3D {...props}>
      <Suspense>
        <Center position={[0, 0, 0]}>
          <Text3D
            curveSegments={16}
            bevelEnabled
            bevelSegments={8}
            bevelSize={0.007}
            bevelThickness={0.01}
            height={0.01}
            lineHeight={0.7}
            letterSpacing={0.015}
            size={0.1}
            font="/Inter_Bold.json">
            {'Example'}
            <meshStandardMaterial color={gold} />
          </Text3D>
        </Center>
      </Suspense>

      <ButtonGithub url={GITHUB_WINLC} position={[0.2, -0.25, 0]} scale={1.5} />
      <ButtonOpen url={SITE_WINLC} text='example site' position={[-0.2, -0.25, 0]} scale={1.5} />
    </object3D>
  )
}

export default LinkWINLC