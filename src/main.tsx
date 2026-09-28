import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import './styles/fonts.css'
import './styles/tokens.css'
import './styles/reset.css'

// Router는 여기서 한 번만 연결한다 (Declarative Mode: BrowserRouter + Routes).
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
