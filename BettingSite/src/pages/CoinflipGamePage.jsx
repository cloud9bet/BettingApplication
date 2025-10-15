import Header from "../components/Header"
import Footer from "../components/Footer"
// importer spil
import '../styles/GamePage.css'


function CoinflipGamePage() {
  return (
  <div className="CoinFlipGamePage-container">
      <div >
      <Header/>
      </div>
      <div className="CoinFlipGamePage-game">
       
      </div>
      <div>
        <Footer/>
      </div>
  </div>
  )
}

export default CoinflipGamePage
