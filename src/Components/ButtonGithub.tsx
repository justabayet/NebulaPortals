import { Object3DProps } from '@react-three/fiber'
import ButtonCube from './ButtonCube'

interface ButtonGithubProps extends Object3DProps {
  url: string
}

function ButtonGithub(props: ButtonGithubProps): JSX.Element {
  return <ButtonCube variant='github' {...props} text='Open github.com in a new tab?' />
}

export default ButtonGithub