import { Object3DProps } from '@react-three/fiber'
import { HoverableImage } from '../Image'
import githubImage from './github.png'

interface GithubButtonProps extends Object3DProps {
  url: string
}

function GithubButton({ url, ...props }: GithubButtonProps): JSX.Element {
  return (
    <object3D {...props}>
      <HoverableImage src={githubImage} radius={0.49} size={0.2} onClick={() => {
        if (window.confirm('Open the Github repo in a new tab?'))
          window.open(url, '_blank')
      }} />
    </object3D>
  )
}

export default GithubButton