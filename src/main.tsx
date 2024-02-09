import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Router } from 'wouter'
import { useHashLocation } from "wouter/use-hash-location"
import Overlay from './Overlay'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router hook={useHashLocation}>
      <Overlay />
      <App />
    </Router>
  </React.StrictMode>,
)
