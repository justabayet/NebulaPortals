import { Color, Vector3 } from 'three'
import { RoomProps } from './interface'
import { Y_AXIS } from '../const'
import BarkBudget from './BarkBudget'
import IncomingRoom from './IncomingRoom'
import LolRoom from './LolRoom'
import { RoomType } from './type'
import { roomsConfig } from '../provider/RoomReadyProvider'
import LinkedIn from './LinkedIn'
import Github from './Github'
import Email from './Email'

const base = new Color()
const red = new Color('red')
const blue = new Color('blue')

type RoomFunction = (props: RoomProps) => JSX.Element
type RoomGenerator = (index: number) => RoomFunction
const roomFnMapping: Record<RoomType, RoomGenerator> = {
  'BarkBudget': () => BarkBudget,
  'LolRoom': () => LolRoom,
  'IncomingRoom': getIncomingRoom,
  'LinkedIn': () => LinkedIn,
  'Github': () => Github,
  'Email': () => Email,
}

function getIncomingRoom(index: number) {
  return (props: RoomProps) => IncomingRoom({
    ...props,
    name: `Incoming${index}`,
    color: base.lerpColors(red, blue, index / roomsConfig.length).clone()
  })
}

type RoomArray = [RoomFunction, `${string}-${string}-${string}-${string}-${string}`][]

const rooms: RoomArray = roomsConfig.map((roomType, index) => {
  return [
    roomFnMapping[roomType](index),
    crypto.randomUUID()
  ]
})

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