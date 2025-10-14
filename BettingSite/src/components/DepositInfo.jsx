import { useState } from "react";

function DepositInfo() {
  const [DInput, setDinput] = useState()

  function handleInputChange(event){
    setDinput(event.target.value);
  }

  function ResetInput(){
    setDinput(0);
  }

  return (
      <div className="DepositInput">
        <input type="text" placeholder="Enter amount" value={DInput} onChange={handleInputChange}/>
            <input type="submit" className="ResetButton" onClick={ResetInput} value="pay"/>
      </div>
  )
}
export default DepositInfo