/**
 * Original icon reference: https://www.flaticon.com/free-animated-icons/finger Finger animated icons created by Freepik - Flaticon
 */
import big_dark from './swipe_vertical_big_dark.gif'
import small_dark from './swipe_vertical_small_dark.gif'
import big_light from './swipe_vertical_big_light.gif'
import small_light from './swipe_vertical_small_light.gif'
import { AnimatedIconProps, VariationList } from '../interface'

const variations: VariationList = {
  big_dark,
  small_dark,
  big_light,
  small_light
}

function SwipeVertical({ size = 'big', theme = 'dark', ...props }: AnimatedIconProps): JSX.Element {
  return (
    <img src={variations[`${size}_${theme}`]} alt="swipe vertical" {...props} />
  )
}

export default SwipeVertical