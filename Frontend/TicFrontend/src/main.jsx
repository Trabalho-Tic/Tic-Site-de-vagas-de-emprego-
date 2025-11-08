import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './routes.jsx'
import VLibras from './components/Vlibras.jsx'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Router />
    <VLibras />
  </StrictMode>,
)
