import { Color, Vector3 } from "three"
import BarkBudget from "./BarkBudget"
import DefaultContent, { RoomProps } from "./DefaultContent"

const base = new Color()
const red = new Color("red")
const blue = new Color("blue")

const rooms = [
  BarkBudget,
  (props: RoomProps) => DefaultContent({ ...props, name: "1", color: "red" }),
  (props: RoomProps) => DefaultContent({
    ...props, name: "2", 
    color: base.lerpColors(red, blue, 0.1) 
  }),
  (props: RoomProps) => DefaultContent({
    ...props, name: "3", 
    color: base.lerpColors(red, blue, 0.2) 
  }),
  (props: RoomProps) => DefaultContent({
    ...props, name: "4", 
    color: base.lerpColors(red, blue, 0.4) 
  }),
  (props: RoomProps) => DefaultContent({
    ...props, name: "5", 
    color: base.lerpColors(red, blue, 0.6) 
  }),
  (props: RoomProps) => DefaultContent({
    ...props, name: "6", 
    color: base.lerpColors(red, blue, 0.8) 
  }),
  (props: RoomProps) => DefaultContent({
    ...props, name: "7", 
    color: base.lerpColors(red, blue, 1) 
  }),
]

const DEFAULT_POSITION = new Vector3(3, 0, 0)
const ANGLE = Math.PI / 3.5
const Y_DIFFERENCE = 1
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