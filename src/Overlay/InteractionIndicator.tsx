import { PropsWithChildren } from 'react'
import { ClickOneFingerBigLight, SwipeHorizontalBigLight, SwipeVerticalBigLight } from 'animated-icons'
import './InteractionIndicator.css'
import { useInteractionState } from '../provider/InteractionStateProvider'
import { useCurrentProject } from '../hooks'
import { useCameraStillnessContext } from '../provider/CameraStillnessProvider'

function BottomCentered({ children }: PropsWithChildren): JSX.Element {
  return (
    <div className='overlay center bottom full-width'>
      <div>
        {children}
      </div>
    </div>
  )
}

const getIconStyle = (isDisplayed: boolean) =>
  ({ width: '35px', transition: 'opacity 0.3s linear 0.5s', opacity: isDisplayed ? 1 : 0 })

function RoomIndicator(): JSX.Element {
  const { hasLookedAround } = useInteractionState()
  const { hasCurrent: isInRoom } = useCurrentProject()

  const isDisplayed = isInRoom && !hasLookedAround

  return (
    <BottomCentered>
      <SwipeHorizontalBigLight style={{ ...getIconStyle(isDisplayed) }} />
    </BottomCentered>
  )
}

function TowerIndicator(): JSX.Element {
  const { hasScrolled } = useInteractionState()
  const { hasCurrent: isInRoom } = useCurrentProject()

  const isDisplayed = !isInRoom && !hasScrolled

  return (
    <BottomCentered>
      <SwipeVerticalBigLight style={{ ...getIconStyle(isDisplayed) }} />
    </BottomCentered>
  )
}

function PortalClickIndicator(): JSX.Element {
  const { hasEnteredRoom, hasScrolled } = useInteractionState()
  const { isCameraStill } = useCameraStillnessContext()
  const { hasCurrent: isInRoom } = useCurrentProject()

  const isDisplayed = !isInRoom && !hasEnteredRoom && hasScrolled && isCameraStill

  return (
    <div className='overlay center full-screen'>
      <div>
        <ClickOneFingerBigLight style={{ ...getIconStyle(isDisplayed) }} />
      </div>
    </div>
  )
}

function InteractionIndicator(): JSX.Element {
  return (
    <>
      <TowerIndicator />
      <RoomIndicator />
      <PortalClickIndicator />
    </>
  )
}

export default InteractionIndicator