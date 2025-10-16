import { useNavigate } from "react-router-dom"
import HeaderSettings from "../components/HeaderSettings"
import Footer from "../components/Footer"
import Limit from "../components/Limit"
import History from "../components/History"
import '../styles/Settings.css'
import '../styles/PopUp.css'

import { useState } from "react"


function SettingsPage() {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(false);
  const [history, setHistory] = useState(false);

  function onLimitClicked() {
    setLimit(true);
  }

  function onHistoryClicked() {
    setHistory(true);
  }

  function onCloseClicked() {
    setLimit(false);
    setHistory(false);
  }


  function OnLogOutClicked() {
    navigate("/");
  }

  return (
    <div className="Settingspage-container">
      <div >
        <HeaderSettings />
      </div>
      <h1>Settings</h1>
      <div className="Settingspage-btns-container">

        <button onClick={onLimitClicked}>
          Set Deposit Limit
        </button>

        {history && (
          <div className="rootOverlay">
            <div className="overlay" onClick={onCloseClicked}></div>
            <div className="Settingspage-history-popup">
              <History onClose={onCloseClicked} /> </div>
          </div>)}

        <button onClick={onHistoryClicked}>
          History
        </button>

        {limit && (
          <div className="rootOverlay">
            <div className="overlay" onClick={onCloseClicked}></div>
            <div className="Settingspage-limit-popup">
              <Limit onClose={onCloseClicked} /> </div>
          </div>)}


        <button className="logout-btn" onClick={OnLogOutClicked}>
          Log-out
        </button>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default SettingsPage