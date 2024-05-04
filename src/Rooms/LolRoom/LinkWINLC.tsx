import { Object3DProps } from '@react-three/fiber'
import { Center } from '@react-three/drei/core/Center'
import { Text3D } from '@react-three/drei/core/Text3D'
import { Suspense } from 'react'
import { GithubButton } from '../../Components'
import OpenButton from '../../Components/OpenButton'

const gold = 0xC19D4D

const GITHUB_WINLC = 'https://github.com/justabayet/whenisnextlolclash'
const SITE_WINLC = 'https://whenisnextlolclash.justabayet.com/'

function LinkWINLC(props: Object3DProps): JSX.Element {
  return (
    <object3D {...props}>

      <GithubButton url={GITHUB_WINLC} position={[-0.4, 0.1, 0]} scale={0.7} rotation={[0, Math.PI * 0.2, 0]} />
      <OpenButton url={SITE_WINLC} text='example site' position={[-0.4, -0.1, 0]} scale={0.7} rotation={[0, Math.PI * 0.2, 0]} />

      <Suspense>
        <Center position={[0.2, 0, 0]}>
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
    </object3D>
  )
}

export default LinkWINLC