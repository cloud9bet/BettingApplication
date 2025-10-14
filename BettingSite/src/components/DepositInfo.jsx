import { useState } from "react";
import '../styles/Deposit.css' 


function DepositInfo() {
  const [DInput, setDinput] = useState()

  function handleInputChange(event){
    setDinput(event.target.value);
  }

  function ResetInput(){
    setDinput(0);
  }

  return (
      <div className="Deposit-container">
        <input type="text" className="DepositInput" placeholder="Enter amount" value={DInput} onChange={handleInputChange}/>
            <input type="submit" className="ResetButton" onClick={ResetInput} value="pay"/>
      </div>
  )
}
export default DepositInfo