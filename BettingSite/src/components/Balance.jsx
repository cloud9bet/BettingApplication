import {useUserInfo}  from '../Context/UserContext';
import { formatCompactNumber } from '../utils/MathCompacter';
import '../styles/Header.css'

function Balance() {
  const { totalBalance } = useUserInfo();



  return (  
    <>
      <div className="BalanceInput">
        <p data-testid = "balance" >Balance: {formatCompactNumber(totalBalance)} $</p>
      </div>
    </>
  )
}

export default Balance