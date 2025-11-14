import CoinflipGame from "../components/CoinflipGame/gameComponents/coinflipGame"
import { Navigate } from 'react-router-dom'
import  {useUserInfo}  from '../Context/UserContext';
import '../styles/Page.css'


function Coinflip() {
  const {activeStatus} = useUserInfo();

  return (
     activeStatus?  <div className="CoinFlipGamePage-game">
        <CoinflipGame/>
      </div> : <Navigate to='/'/>
      
  )
}

export default Coinflip
