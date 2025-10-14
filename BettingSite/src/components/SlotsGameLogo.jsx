import { useNavigate } from "react-router-dom"
import SlotsLogo from '../Images/SlotsLogo.png';
import '../styles/Logo.css'
 

function SlotsGameLogo() {
    const navigate = useNavigate();
  
  function OnLogoClicked() {
    navigate("/settings");
  }

  return ( 
      <div className="SlotsLogo-btn">
        <img src={SlotsLogo} alt="SlotsLogo"  onClick={OnLogoClicked}/>
      </div>
  )
}

export default SlotsGameLogo