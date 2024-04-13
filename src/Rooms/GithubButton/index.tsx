import { Object3DProps } from '@react-three/fiber'
import Image from '../Image'
import githubImage from './github.png'

interface GithubButtonProps extends Object3DProps {
  url: string
}

function GithubButton({ url, ...props }: GithubButtonProps): JSX.Element {
  return (
    <object3D {...props}>
      <Image src={githubImage} radius={0.49} size={0.2} hoverable onClick={() => {
        window.open(url, '_blank')
      }} />
    </object3D>
  )
}

export default GithubButton