import { Vector3 } from "three"
import BarkBudget from "./BarkBudget"
import DefaultContent, { RoomProps } from "./DefaultContent"


const rooms = [
  (props: RoomProps) => DefaultContent({ ...props, name: "red", color: "red" }),
  BarkBudget,
  (props: RoomProps) => DefaultContent({ ...props, name: "blue", color: "blue" }),
  (props: RoomProps) => DefaultContent({ ...props, name: "blue1", color: "blue" }),
  (props: RoomProps) => DefaultContent({ ...props, name: "blue2", color: "blue" }),
  (props: RoomProps) => DefaultContent({ ...props, name: "blue3", color: "blue" }),
  (props: RoomProps) => DefaultContent({ ...props, name: "blue4", color: "blue" }),
  (props: RoomProps) => DefaultContent({ ...props, name: "blue5", color: "blue" }),
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