import { Color, Vector3 } from "three"
import BarkBudget from "./BarkBudget"
import DefaultContent, { RoomProps } from "./DefaultContent"

const base = new Color()
const red = new Color("red")
const blue = new Color("blue")

const rooms = [
  BarkBudget,
]

const NB_EXTRA_ROOMS = 10

for (let i = 1; i <= NB_EXTRA_ROOMS; i++) {
  rooms.push((props: RoomProps) => DefaultContent({
    ...props, name: `${i}`, 
    color: base.lerpColors(red, blue, i / NB_EXTRA_ROOMS) 
  }))
}

const DEFAULT_POSITION = new Vector3(3, 0, 0)
const ANGLE = Math.PI / 2.5
const Y_DIFFERENCE = 1.5
const NB_ROOMS = rooms.length
const FULL_ANGLE = (NB_ROOMS - 1) * ANGLE
const NB_FULL_ROTATION = FULL_ANGLE / (Math.PI * 2)
const FULL_HEIGHT = (NB_ROOMS - 1) * Y_DIFFERENCE

export {
  rooms,
  DEFAULT_POSITION,
  ANGLE,
  Y_DIFFERENCE,
  NB_ROOMS,
  NB_FULL_ROTATION,
  FULL_ANGLE,
  FULL_HEIGHT
}