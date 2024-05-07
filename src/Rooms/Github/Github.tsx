import { useMemo } from 'react'
import { Euler } from 'three'
import { RoomProps } from '../interface'
import { IsReady } from '../Portal/Portal'
import ButtonGithub from '../../Components/ButtonGithub'

const NAME = 'Github'
const URL = 'https://github.com/justabayet/'

function Github({ angle, position }: RoomProps): JSX.Element {
  const rotation = useMemo(() => new Euler(0, angle - Math.PI / 2, 0), [angle])

  return (
    <object3D position={position} rotation={rotation}>
      <ButtonGithub scale={10} url={URL} isLogoBasicMaterial logoScale={0.8} />

      <IsReady name={NAME} />
    </object3D>
  )
}

export default Github