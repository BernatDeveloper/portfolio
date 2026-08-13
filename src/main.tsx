import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n/i18n'
import { App } from './App.tsx'

// Browsers try to restore the pre-reload scroll offset as the page grows
// during load, which fights with Lenis/ScrollTrigger and produces a jump
// to a mid-page section before snapping back up. Every reload should land
// at the top instead.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
