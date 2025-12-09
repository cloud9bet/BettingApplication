import { useNavigate } from "react-router-dom"
import { FaHome } from "react-icons/fa";

function HomeBtn() {
    const navigate = useNavigate();
  
  function OnHomeClicked() {
    navigate("/");
  }

  return ( 
      <div className="home-btn">
      <button className="btn" onClick={OnHomeClicked}>
        <FaHome />
      </button>
      </div>
  )
}

export default HomeBtn