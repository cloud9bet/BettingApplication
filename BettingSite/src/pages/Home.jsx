import SlotsGameLogo from "../components/SlotsGameLogo"
import CrashGameLogo from "../components/CrashGameLogo"
import CoinflipGameLogo from "../components/CoinflipGameLogo"
import '../styles/Page.css'


function Home() {
  return (
      <div className="Homepage-games">
        <SlotsGameLogo/>
        <CrashGameLogo/>
        <CoinflipGameLogo/>
      </div>
  )
}

export default Home
