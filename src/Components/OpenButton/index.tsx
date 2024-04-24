// Icon asset from https://www.flaticon.com/free-icons/share Share icons created by IconKanan - Flaticon
import { Object3DProps } from '@react-three/fiber'
import { HoverableImage } from '../Image'
import openImage from './open.png'
import { FrontSide } from 'three'

interface OpenButtonProps extends Object3DProps {
  url: string
  text?: string
}

function OpenButton({ url, text, ...props }: OpenButtonProps): JSX.Element {
  const urlText = text ?? url
  return (
    <object3D {...props}>
      <HoverableImage src={openImage} side={FrontSide} radius={0.49} size={0.2} onClick={() => {
        if (window.confirm(`Open ${urlText} in a new tab?`))
          window.open(url, '_blank')
      }} />
    </object3D>
  )
}

export default OpenButton