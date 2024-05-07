import { Object3DProps } from '@react-three/fiber'
import ButtonCube from './ButtonCube'

interface ButtonLinkedInProps extends Object3DProps { }

const URL = 'https://www.linkedin.com/in/anthony-bayet'

function ButtonLinkedIn(props: ButtonLinkedInProps): JSX.Element {
  return <ButtonCube
    {...props}
    variant='linkedin'
    text='Open LinkedIn profile in a new tab?'
    url={URL}
    isLogoBasicMaterial
    logoScale={0.7}
    cornerRadius={0.1} />
}

export default ButtonLinkedIn