import { useNavigate } from "react-router-dom"
import CrashLogo from '../Images/CrashLogo.png';
import  {useUserInfo}  from '../Context/UserContext';
import '../styles/Logo.css'
 

function CrashGameLogo() {
    const navigate = useNavigate();
    const {activeStatus} = useUserInfo();
  
  function OnLogoClicked() {
    if(!activeStatus) return;
    navigate("/Crash");
  }

  return ( 
      <div className={`CrashLogo-btn ${!activeStatus ? "disabled" : ""}`}>
        <img src={CrashLogo} alt="CrashLogo"  onClick={OnLogoClicked}/>
      </div>
  )
}

export default CrashGameLogo