import Header from "../components/Header"
import Footer from "../components/Footer"
// importer spil
import GamblingCrash from '../components/CrashGame/gameComponents/GamblingCrash'
import '../styles/GamePage.css'


function CrashGamePage() {
  return (
  <div className="CrashGamePage-container">
      <div >
      <Header/>
      </div>
      <div className="CrashGamePage-game">
      <GamblingCrash/>
      </div>
      <div>
        <Footer/>
      </div>
  </div>
  )
}

export default CrashGamePage
