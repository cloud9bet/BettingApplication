import { useNavigate } from "react-router-dom"
import CloudLogo from '../Images/Cloud9.png';
import '../styles/Logo.css'
 

function Logo() {
    const navigate = useNavigate();
  
  function OnLogoClicked() {
    navigate("/home");  
  }

  return ( 
      <div className="Logo-btn">
        <img src={CloudLogo} alt="Logo"  onClick={OnLogoClicked}/>
      </div>
  )
}

export default Logo