import { DetailedHTMLProps, ImgHTMLAttributes } from 'react'

type Theme = 'dark' | 'light'
type Size = 'small' | 'big'

type VariationName = `${Size}_${Theme}`

export type VariationList = {
  [variation in VariationName]: string
}

type HTMLImageElementProps = Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'src'>

export interface AnimatedIconProps extends HTMLImageElementProps {
  theme?: Theme
  size?: Size
}