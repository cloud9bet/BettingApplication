import { useNavigate } from "react-router-dom";
import Limit from "../components/Limit";
import History from "../components/History";
import { DeleteUser } from "../services/ControllerService/userApi";
import '../styles/Page.css';
import '../styles/Popup.css';

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
    sessionStorage.clear(); 
    navigate("/login");
  }


    async function OnDeleteClicked() {
    if (!window.confirm("Are You Sure You Want To Delete Your Account?")) return;

    const result = await DeleteUser();
    
    if(result){
      sessionStorage.clear(); 
      navigate("/login");
    }
    else{
      alert("Account Deletion Failed");
    }
  }
  
  return (
    <div className="Settingspage-container">
      <h1 id="settingName" >Settings</h1>
      <div className="Settingspage-btns-container">

        <button className="limit-btn" onClick={onLimitClicked}>
          Set Deposit Limit
        </button>

        {history && (
          <div className="rootOverlay">
            <div className="overlay" onClick={onCloseClicked}></div>
            <div className="Settingspage-history-popup">
              <History onClose={onCloseClicked} /> </div>
          </div>)}

        <button className="history-btn" onClick={onHistoryClicked}>
          History
        </button>

        {limit && (
          <div className="rootOverlay">
            <div className="overlay" onClick={onCloseClicked}></div>
            <div className="Settingspage-limit-popup">
              <Limit onClose={onCloseClicked} /> </div>
          </div>)}


        <button className="logout-btn" onClick={OnLogOutClicked}>
          Logout
        </button>
          <button className="delete-btn" onClick={OnDeleteClicked}>
          DELETE ACCOUNT
        </button>
      </div>
    </div>
  )
}

export default Settings