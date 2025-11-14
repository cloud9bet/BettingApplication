import { Routes, Route } from "react-router-dom"
import ProtectedRoutes from './utils/Protected'
import Layout from './utils/Layout'
import Home from "./pages/Home"
import Settings from "./pages/Settings"
import Coinflip from "./pages/CoinflipGame"
import Crash from "./pages/CrashGame"
import Slots from "./pages/SlotsGame"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from './pages/LoginPage'
import './styles/App.css'

function App() {
  return (
    <main className="main-content"> 
      <Routes >
        <Route element={<ProtectedRoutes/>}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/Coinflip" element={<Coinflip />} />
            <Route path="/Crash" element={<Crash />} />
            <Route path="/Slots" element={<Slots />} />
          </Route>
        </Route>
    
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </main>
  )
}

export default App
