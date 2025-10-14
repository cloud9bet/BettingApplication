import { useState, useRef, useEffect } from "react";
import DepositInfo from "./DepositInfo"

function Deposit() {
  const [deposit, setDeposit] = useState(false);
   const containerRef = useRef(null);
  

    function DepostClicked(){
          setDeposit(prev => !prev);
  }

    useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setDeposit(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
      <div className="DepositPress" ref={containerRef}>
        <button className="DepositButton"  onClick={DepostClicked}>Deposit</button>
         {deposit && <DepositInfo />}
      </div>
  )
}

export default Deposit