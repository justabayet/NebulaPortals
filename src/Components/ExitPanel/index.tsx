// Icon asset from https://www.flaticon.com/free-icons/exit Exit icons created by Freepik - Flaticon
import { Object3DProps } from '@react-three/fiber'
import { HoverableImage } from '../Image'
import exitFace from './exit.webp'
import exitLeft from './exit_left.webp'
import exitRight from './exit_right.webp'
import { RoundedBox } from '@react-three/drei/core/RoundedBox'
import { useRoomData } from '../../provider/RoomDataProvider'
import MeshHoverable from '../MeshHoverable'

const DEPTH = 0.2

type Direction = 'left' | 'right' | 'face'

const images: Record<Direction, string> = {
  'face': exitFace,
  'left': exitLeft,
  'right': exitRight
}

interface ExitPanelProps extends Object3DProps {
  direction?: Direction
}

function ExitPanel({ direction = 'face', ...props }: ExitPanelProps): JSX.Element {
  const { name, setLocation } = useRoomData()

  return (
    <object3D {...props}>
      <object3D scale={0.5}>
        <HoverableImage src={images[direction]} position={[0, 0, (DEPTH / 2) + 0.001]} radius={0} scale={0.9} isBasicMaterial
          onClick={(e) => {
            e.stopPropagation()
            setLocation('previous/' + name)
          }} />
        <MeshHoverable
          onClick={(e) => {
            e.stopPropagation()
            setLocation('previous/' + name)
          }} >
          <RoundedBox args={[0.95, 0.5, DEPTH]} />
          <meshBasicMaterial color={'white'} />
        </MeshHoverable>
      </object3D>
    </object3D>
  )
}

export default ExitPanel