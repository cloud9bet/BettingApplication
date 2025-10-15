import Header from "../components/Header"
import Footer from "../components/Footer"
// importer spil
import '../styles/GamePage.css'


function SlotsGamePage() {
  return (
  <div className="SlotsGamePage-container">
      <div >
      <Header/>
      </div>
      <div className="SlotsGamePage-game">
       
      </div>
      <div>
        <Footer/>
      </div>
  </div>
  )
}

export default SlotsGamePage
