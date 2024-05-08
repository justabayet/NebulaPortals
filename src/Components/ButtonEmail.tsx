import { Object3DProps } from '@react-three/fiber'
import ButtonCube from './ButtonCube'

interface ButtonEmailProps extends Object3DProps { }

const EMAIL = 'anthony.bayet1999@gmail.com'
const URL = `mailto:${EMAIL}`

function ButtonEmail(props: ButtonEmailProps): JSX.Element {
  return <ButtonCube
    {...props}
    variant='email'
    text={`Write an email to ${EMAIL}?`}
    url={URL}
    isLogoBasicMaterial
    logoScale={0.5}
    cornerRadius={0.1} />
}

export default ButtonEmail