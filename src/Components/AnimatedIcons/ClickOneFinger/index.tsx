/**
 * Original icon reference: https://www.flaticon.com/free-animated-icons/click Click animated icons created by Freepik - Flaticon
 */
import big_dark from './click_touch_big_dark.gif'
import small_dark from './click_touch_small_dark.gif'
import big_light from './click_touch_big_light.gif'
import small_light from './click_touch_small_light.gif'
import { AnimatedIconProps, VariationList } from '../interface'

const variations: VariationList = {
  big_dark,
  small_dark,
  big_light,
  small_light
}

function ClickOneFinger({ size = 'big', theme = 'dark', ...props }: AnimatedIconProps): JSX.Element {

  return (
    <img src={variations[`${size}_${theme}`]} alt="loading..." {...props} />
  )
}

export default ClickOneFinger