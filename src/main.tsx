import ReactDOM from 'react-dom/client'
import { Router } from 'wouter'
import { useHashLocation } from 'wouter/use-hash-location'

import './index.css'
import Overlay from './Overlay'
import App from './App'
import { InteractionStateProvider } from './provider/InteractionStateProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router hook={useHashLocation}>
    <InteractionStateProvider>
      <Overlay />
      <App />
    </InteractionStateProvider>
  </Router>,
)
