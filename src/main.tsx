import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import '@styles/variables.css'
import '@styles/reset.css'
import '@styles/typography.css'
import App from './App'

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
)
