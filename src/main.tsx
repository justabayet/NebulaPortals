import ReactDOM from 'react-dom/client'
import { Router } from 'wouter'
import { useHashLocation } from 'wouter/use-hash-location'

import App from './App'
import { InteractionStateProvider } from './provider/InteractionStateProvider.tsx'
import { CameraStillnessProvider } from './provider/CameraStillnessProvider.tsx'
import { RoomReadyProvider } from './provider/RoomReadyProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router hook={useHashLocation}>
    <CameraStillnessProvider>
      <InteractionStateProvider>
        <RoomReadyProvider>
          <App />
        </RoomReadyProvider>
      </InteractionStateProvider>
    </CameraStillnessProvider>
  </Router>,
)
