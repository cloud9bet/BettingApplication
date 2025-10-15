import { useNavigate } from "react-router-dom"
import CrashLogo from '../Images/CrashLogo.png';
import '../styles/Logo.css'
 

function CrashGameLogo() {
    const navigate = useNavigate();
  
  function OnLogoClicked() {
    navigate("/Crash");
  }

  return ( 
      <div className="CrashLogo-btn">
        <img src={CrashLogo} alt="CrashLogo"  onClick={OnLogoClicked}/>
      </div>
  )
}

export default CrashGameLogo