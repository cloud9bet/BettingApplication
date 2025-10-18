import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './styles/index.css'
import App from './App.jsx'
import { BalanceContextProvider } from './Context/BalanceContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <BalanceContextProvider>
        <App />
      </BalanceContextProvider>
    </HashRouter>
  </StrictMode>
)
