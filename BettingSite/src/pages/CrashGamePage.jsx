import Header from "../components/Header"
import Footer from "../components/Footer"
import GamblingCrash from '../components/CrashGame/gameComponents/GamblingCrash'
import '../styles/GamePage.css'

function CrashGamePage() {
  return (
    <div className="CrashGamePage-container">
      <Header/>
      <main className="CrashGamePage-game">
        <GamblingCrash/>
      </main>
      <Footer/>
    </div>
  )
}

export default CrashGamePage