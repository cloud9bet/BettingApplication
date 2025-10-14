import { useNavigate } from "react-router-dom"

function SettingsBtn() {
    const navigate = useNavigate();
  
  function OnStettingClicked() {
    navigate("/settings");
  }

  return ( 
      <div className="setting-btn">
      <button className="btn" onClick={OnStettingClicked}>
        👤
      </button>
      </div>
  )
}

export default SettingsBtn