import Header from "../components/Header"
import Footer from "../components/Footer"
import SlotMachine from "../components/SlotMachineGame/gameComponents/SlotMachine"
import {useUserInfo}   from '../Context/UserContext';
import { Navigate } from 'react-router-dom'
import '../styles/Page.css'


function Slots() {
  const {activeStatus} = useUserInfo();

  return (
    activeStatus ?
      <div className="SlotsGamePage-game">
       <SlotMachine />
      </div> :  <Navigate to='/'/>
  )
}

export default Slots
