import { useNavigate } from "react-router-dom"
import RofusImg from '../Images/Rofus.png';
import '../styles/Logo.css'


function RofusLogo() {
    const navigate = useNavigate();
  
  function OnRofusLogoClicked() {
   window.location.href = "https://www.rofus.nu/";
  }

  return ( 
      <div className="RofusLogo-btn">
        <img src={RofusImg} alt="Rofuslogo" onClick={OnRofusLogoClicked}/>
      </div>
  )
}

export default RofusLogo