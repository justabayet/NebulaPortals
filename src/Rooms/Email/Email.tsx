import { useMemo } from 'react'
import { Euler } from 'three'
import { RoomProps } from '../interface'
import { IsReady } from '../Portal/Portal'
import ButtonEmail from '../../Components/ButtonEmail'

const NAME = 'Email'

function Email({ angle, position }: RoomProps): JSX.Element {
  const rotation = useMemo(() => new Euler(0, angle - Math.PI / 2, 0), [angle])

  return (
    <object3D position={position} rotation={rotation}>
      <ButtonEmail scale={10} />

      <IsReady name={NAME} />
    </object3D>
  )
}

export default Email