import { useNavigate } from "react-router-dom"
import Limit from "../components/Limit"
import History from "../components/History"
// import '../styles/Settings.css'
import '../styles/Page.css'
import '../styles/PopUp.css'

import { useState } from "react"

function Settings() {
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
    localStorage.clear(); 
    navigate("/login");
  }

  return (
    <div className="Settingspage-container">
      <h1 id="settingName" >Settings</h1>
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
    </div>
  )
}

export default Settings