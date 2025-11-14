import { useNavigate } from "react-router-dom"
import CoinflipLogo from '../Images/CoinflipLogo.png';
import  {useUserInfo}  from '../Context/UserContext';
import '../styles/Logo.css'
 

function CoinflipGameLogo() {
    const navigate = useNavigate();
    const {activeStatus} = useUserInfo();
  
  function OnLogoClicked() {
    if(!activeStatus) return;
    navigate("/Coinflip");
  }

  return ( 
      <div className={`CoinflipLogo-btn ${!activeStatus ? "disabled" : ""}`}>
        <img src={CoinflipLogo} alt="CoinflipLogo"  onClick={OnLogoClicked}/>
      </div>
  )
}

export default CoinflipGameLogo