import reactLogo from './assets/react.svg' // ændrer logo
import viteLogo from '/vite.svg' //ændrer logo
import './styles/App.css'
import HomePage from "./pages/HomePage"
import SettingsPage from "./pages/SettingsPage"
import {Routes, Route} from "react-router-dom"

function App() {

  return (
    <main className="main-content"> 
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/settings" element={<SettingsPage />}/>
      </Routes>
    </main>
  )
}

export default App