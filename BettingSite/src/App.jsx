import './styles/App.css'
import HomePage from "./pages/HomePage"
import SettingsPage from "./pages/SettingsPage"
import SignUpPage from "./pages/SignUpPage"
import CoinflipGamePage from "./pages/CoinflipGamePage"
import CrashGamePage from "./pages/CrashGamePage"
import SlotsGamePage from "./pages/SlotsGamePage"
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <main className="main-content"> 
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/Coinflip" element={<CoinflipGamePage />}/>
        <Route path="/Crash" element={<CrashGamePage />}/>
        <Route path="/Slots" element={<SlotsGamePage />}/>
        <Route path="/settings" element={<SettingsPage />}/>
      </Routes>
    </main>
  )
}

export default App