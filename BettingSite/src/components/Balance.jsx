import { useUserBalance } from '../Context/BalanceContext';
import '../styles/Balance.css'
import { useState } from "react";

function Balance() {
  const { totalBalance, setTotalBalance } = useUserBalance();



  return (
    <>
      <div className="BalanceInput">
        <p>Balance: {totalBalance} $</p>
      </div>
    </>
  )
}

export default Balance