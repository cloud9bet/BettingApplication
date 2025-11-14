import {useUserInfo}  from '../Context/UserContext';
// import '../styles/Balance.css'
import '../styles/Header.css'
import { useState } from "react";

function Balance() {
  const { totalBalance } = useUserInfo();



  return (
    <>
      <div className="BalanceInput">
        <p data-testid = "balance" >Balance: {totalBalance} $</p>
      </div>
    </>
  )
}

export default Balance