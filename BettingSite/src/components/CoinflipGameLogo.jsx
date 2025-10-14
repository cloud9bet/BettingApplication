import { useNavigate } from "react-router-dom"
import CoinflipLogo from '../Images/CoinflipLogo.png';
import '../styles/Logo.css'
 

function CoinflipGameLogo() {
    const navigate = useNavigate();
  
  function OnLogoClicked() {
    navigate("/settings");
  }

  return ( 
      <div className="CoinflipLogo-btn">
        <img src={CoinflipLogo} alt="CoinflipLogo"  onClick={OnLogoClicked}/>
      </div>
  )
}

export default CoinflipGameLogo