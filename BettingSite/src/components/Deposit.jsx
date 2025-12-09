import { useState } from "react";
import DepositInfo from "./DepositInfo";
import "../styles/Popup.css";
import "../styles/Header.css";


function Deposit() {
  const [deposit, setDeposit] = useState(false);

  function DepostClicked() {
    setDeposit(true)
  }

  function CloseDeposit() {
    setDeposit(false);
  }

  return (
    <div className="DepositPress">
      <button className="DepositButton" onClick={DepostClicked}>
        Deposit
      </button>

      {deposit && (
        <div className="rootOverlay">
          <div className="overlay" onClick={CloseDeposit}></div>
          <div className="DepositPress">
            <DepositInfo onClose={CloseDeposit} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Deposit;
