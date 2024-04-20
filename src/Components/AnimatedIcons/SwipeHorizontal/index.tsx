/**
 * Original icon reference: https://www.flaticon.com/free-animated-icons/buy Buy animated icons created by Freepik - Flaticon
 */
import big_dark from './swipe_horizontal_big_dark.gif'
import small_dark from './swipe_horizontal_small_dark.gif'
import big_light from './swipe_horizontal_big_light.gif'
import small_light from './swipe_horizontal_small_light.gif'
import { AnimatedIconProps, VariationList } from '../interface'

const variations: VariationList = {
  big_dark,
  small_dark,
  big_light,
  small_light
}

function SwipeHorizontal({ size = 'big', theme = 'dark', ...props }: AnimatedIconProps): JSX.Element {

  return (
    <img src={variations[`${size}_${theme}`]} alt="swipe horizontal" {...props} />
  )
}

export default SwipeHorizontal