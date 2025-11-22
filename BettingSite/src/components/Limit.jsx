import { useState } from "react";
import { useUserInfo } from '../Context/UserContext';
import { SetUserDepositLimit } from "../services/ControllerService/userApi";

import '../styles/Popup.css' 


function Limit({ onClose }) {
  const [limit, setLimit] = useState("")
  const { setDepositLimit } = useUserInfo();
  
  async function putDepositLimit() {

    const result = await SetUserDepositLimit(limit);

    if (result) {
      setDepositLimit(limit);
      alert("Deposit Limit Was Set To " + limit + "$");
    }
    else {
      alert("An Error Occured And Deposit Limit Was Not Set");
    }
  }

  function handleInputChange(event){
    setLimit(event.target.value);
  }

  function setLimitClicked(){
    putDepositLimit();
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