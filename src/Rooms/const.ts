import { Color, Vector3 } from 'three'
import BarkBudget from './BarkBudget'
import DefaultRoom from './DefaultRoom'
import { RoomProps } from './interface'
import { Y_AXIS } from '../const'

const base = new Color()
const red = new Color('red')
const blue = new Color('blue')

const rooms: ((props: RoomProps) => JSX.Element)[] = [
  BarkBudget
]

const NB_EXTRA_ROOMS = 10

for (let i = 1; i <= NB_EXTRA_ROOMS; i++) {
  const Room = (props: RoomProps) => DefaultRoom({
    ...props,
    name: `${i}`, 
    color: base.lerpColors(red, blue, i / NB_EXTRA_ROOMS)
  })

  rooms.push(Room)
}

const DEFAULT_POSITION = new Vector3(3, 0, 0)
const ANGLE = Math.PI / 2.5
const Y_DIFFERENCE = 1.5
const NB_ROOMS = rooms.length

function getRoomArgs(index: number): { angle: number, position: [number, number, number] } {
  const angle = -ANGLE * index
  const position = DEFAULT_POSITION
    .clone()
    .applyAxisAngle(Y_AXIS, angle)
    .setY(-index * Y_DIFFERENCE)

  return { angle, position: position.toArray() }
}

const FULL_ANGLE = (NB_ROOMS - 1) * ANGLE
const NB_FULL_ROTATION = FULL_ANGLE / (Math.PI * 2)
const FULL_HEIGHT = (NB_ROOMS - 1) * Y_DIFFERENCE

export {
  rooms,
  getRoomArgs,
  FULL_ANGLE,
  NB_FULL_ROTATION,
  FULL_HEIGHT
}