import { Object3DProps } from '@react-three/fiber'
import ButtonCube from './ButtonCube'

interface ButtonOpenProps extends Object3DProps {
  url: string
  text?: string
}

function ButtonOpen({ text, ...props }: ButtonOpenProps): JSX.Element {
  const urlText = text ? `Open ${text} in a new tab?` : undefined

  return <ButtonCube variant='redirect' {...props} text={urlText} />
}

export default ButtonOpen