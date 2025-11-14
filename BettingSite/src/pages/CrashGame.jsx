import GamblingCrash from '../components/CrashGame/gameComponents/GamblingCrash'
import { Navigate } from 'react-router-dom'
import {useUserInfo}   from '../Context/UserContext';
import '../styles/Page.css'

function Crash() {
    const {activeStatus} = useUserInfo();

  return (
      activeStatus? <div className="CrashGamePage-game">
         <GamblingCrash/> 
      </div> : <Navigate to='/'/>
  )
}

export default Crash