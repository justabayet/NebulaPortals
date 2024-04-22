import ReactDOM from 'react-dom/client'
import { Router } from 'wouter'
import { useHashLocation } from 'wouter/use-hash-location'

import './index.css'
import Overlay from './Overlay'
import App from './App'
import { InteractionStateProvider } from './provider/InteractionStateProvider.tsx'
import { CameraStillnessProvider } from './provider/CameraStillnessProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router hook={useHashLocation}>
    <CameraStillnessProvider>
      <InteractionStateProvider>
        <Overlay />
        <App />
      </InteractionStateProvider>
    </CameraStillnessProvider>
  </Router>,
)
