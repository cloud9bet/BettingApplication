import Header from "../components/Header"
import Footer from "../components/Footer"
import SlotsGameLogo from "../components/SlotsGameLogo"
import CrashGameLogo from "../components/CrashGameLogo"
import CoinflipGameLogo from "../components/CoinflipGameLogo"
import '../styles/HomePage.css'

function HomePage() {
  return (
  <div className="Homepage-container">
      <div >
      <Header/>
      </div>
      <div className="Homepage-games">
        <SlotsGameLogo/>
        <CrashGameLogo/>
        <CoinflipGameLogo/>
      </div>
      <div>
        <Footer/>
      </div>
  </div>
  )
}

export default HomePage
