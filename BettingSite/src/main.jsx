import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './styles/index.css'
import App from './App.jsx'
import { UserContextProvider } from './Context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode> //forhindrer to render af useEffect grundet debug
    <HashRouter>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </HashRouter>
  // </StrictMode>
)
