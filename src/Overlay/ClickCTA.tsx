import { CSSProperties } from 'react'
import './ClickCTA.css'

interface ClickCTAProps {
  style: CSSProperties
}

function ClickCTA({ style }: ClickCTAProps): JSX.Element {
  return (
    <div id="loading-screen-text-start-container" style={style}>
      <div className="cube-wrapper">
        <div className="cube">
          <div className="cube__top"></div>
          <div className="cube__right"></div>
          <div className="cube__bottom"></div>
          <div className="cube__left"></div>
          <div className="cube__front"></div>
          <div className="cube__back"></div>
        </div>
      </div>
    </div>
  )
}

export default ClickCTA