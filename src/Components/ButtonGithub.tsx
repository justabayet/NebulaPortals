import ButtonCube from './ButtonCube'
import { ButtonCubeProps } from './ButtonCube/ButtonCube'

type ButtonGithubProps = Omit<ButtonCubeProps, 'variant' | 'text'>

function ButtonGithub(props: ButtonGithubProps): JSX.Element {
  return <ButtonCube variant='github' {...props} text='Open github.com in a new tab?' />
}

export default ButtonGithub