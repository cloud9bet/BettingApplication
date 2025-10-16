import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import App from './App.jsx'
import { BalanceContextProvider } from './Context/BalanceContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/BettingApplication">
    <BalanceContextProvider>
    <App />
    </BalanceContextProvider>
    </BrowserRouter>
  </StrictMode>,
)