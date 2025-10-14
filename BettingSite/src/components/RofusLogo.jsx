import { useNavigate } from "react-router-dom"
import RofusImg from '../Images/Rofus.png';

function RofusLogo() {
    const navigate = useNavigate();
  
  function OnRofusLogoClicked() {
    navigate("/settings");
  }

  return ( 
      <div className="RofusLogo-btn">
        <img src={RofusImg} alt="Rofuslogo" onClick={OnRofusLogoClicked}/>
      </div>
  )
}

export default RofusLogo