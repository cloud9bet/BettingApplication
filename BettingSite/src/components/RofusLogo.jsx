import { useNavigate } from "react-router-dom"
import RofusImg from '../Images/Rofus.png';
import '../styles/Logo.css'


function RofusLogo() {
    const navigate = useNavigate();
  
  function OnRofusLogoClicked() {
  window.open("https://www.rofus.nu/", "_blank");
  }

  return ( 
      <div className="RofusLogo-btn">
        <img src={RofusImg} alt="Rofuslogo" onClick={OnRofusLogoClicked}/>
      </div>
  )
}

export default RofusLogo