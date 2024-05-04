import { Object3DProps } from '@react-three/fiber'
import { Center } from '@react-three/drei/core/Center'
import { Text3D } from '@react-three/drei/core/Text3D'
import { Suspense } from 'react'
import ButtonOpen from '../../Components/ButtonOpen'
import { ButtonGithub } from '../../Components'

const gold = 0xC19D4D

const GITHUB_LSC = 'https://github.com/justabayet/LoLSceneCreator'
const SITE_LSC = 'https://lsc.justabayet.com/'

function LinkCreator(props: Object3DProps): JSX.Element {
  return (
    <object3D {...props}>
      <ButtonGithub url={GITHUB_LSC} position={[0.3, 0.05, 0]} scale={1.2} />
      <ButtonOpen url={SITE_LSC} text='Creator' position={[0.3, -0.15, 0]} scale={1.2} />

      <Suspense>
        <Center position={[-0.2, 0, 0]}>
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
            {'LoL\nScene\nCreator'}
            <meshStandardMaterial color={gold} />
          </Text3D>
        </Center>
      </Suspense>

    </object3D>
  )
}

export default LinkCreator