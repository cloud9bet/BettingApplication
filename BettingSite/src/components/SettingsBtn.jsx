import { useNavigate } from "react-router-dom"
import { FaUserGear } from "react-icons/fa6";

function SettingsBtn() {
    const navigate = useNavigate();
  
  function OnStettingClicked() {
    navigate("/settings");
  }

  return ( 
      <div className="setting-btn">
      <button className="btn" onClick={OnStettingClicked}>
        <FaUserGear />
      </button>
      </div>
  )
}

export default SettingsBtn