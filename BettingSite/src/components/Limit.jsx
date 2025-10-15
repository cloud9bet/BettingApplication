import { useState } from "react";
import '../styles/Popup.css' 


function Limit({ onClose }) {
  const [limit, setLimit] = useState()

  function handleInputChange(event){
    setLimit(event.target.value);
  }

  function setLimitClicked(){
    setLimit(0);
    onClose();
  }

  return (
      <div className="Limit-container">
        <input type="text" className="LimitInput" placeholder="Enter limit" value={limit} onChange={handleInputChange}/>
            <input type="submit" className="setLimit-btn" onClick={setLimitClicked} value="Confirm"/>
      </div>
  )
}
export default Limit