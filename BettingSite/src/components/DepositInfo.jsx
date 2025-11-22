import { useState } from "react";
import { useUserInfo } from '../Context/UserContext';
import { AddDepositAsync } from "../services/ControllerService/userApi";
// import '../styles/Deposit.css' 
import '../styles/Popup.css'
import '../styles/Header.css'



function DepositInfo({ onClose }) {
  const [depositInput, setDepositInput] = useState("");
  const { setTotalBalance } = useUserInfo();


  async function postDeposit() {

    const result = await AddDepositAsync(depositInput);

    if (result) {
      setTotalBalance(prev => Number(prev) + Number(depositInput));
      alert(Number(depositInput) + "$ was deposited");
    }
    else {
      alert("Deposit Did Not Go Through");
    }
  }


  function handleInputChange(event) {
    setDepositInput(event.target.value);
  }

  function SubmitInput() {
    postDeposit();
    setDepositInput(0);
    onClose();
  }

  return (
    <div className="Deposit-container">
      <input type="text" className="DepositInput" placeholder="Enter amount" value={depositInput} onChange={handleInputChange} />
      <input type="submit" className="SubmitButton" onClick={SubmitInput} value="pay" />
    </div>
  )

}
export default DepositInfo