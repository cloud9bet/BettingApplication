import { useNavigate } from "react-router-dom"
import SlotsLogo from '../Images/SlotsLogo.png';
import  {useUserInfo}  from '../Context/UserContext';
import '../styles/Logo.css'
 

function SlotsGameLogo() {
    const navigate = useNavigate();
    const {activeStatus} = useUserInfo();
  
  function OnLogoClicked() {
    if(!activeStatus) return;
    navigate("/Slots");
  }

  return ( 
      <div className={`SlotsLogo-btn ${!activeStatus ? "disabled" : ""}`}>
        <img src={SlotsLogo} alt="SlotsLogo"  onClick={OnLogoClicked}/>
      </div>
  )
}

export default SlotsGameLogo