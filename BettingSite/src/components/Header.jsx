import Balance from "./Balance"
import Deposit from "./Deposit"
import Logo from "./Logo"
import '../styles/Header.css'
import HomeBtn from "./HomeBtn"
import SettingsBtn from "./SettingsBtn"


function Header() {

  return (
    <header className="header-container">
      <div className="header-logo">
        <Logo />
      </div>
      <div className="header-money-container">
        <div className="header-balance">
          <Balance />
        </div>
        <div className="header-deposit">
          <Deposit />
        </div>
      </div>
      <div className="header-nav">
        <div className="header-homeBtn">
          <HomeBtn />
        </div>
        <div className="header-settingsBtn">
          <SettingsBtn />
        </div>
      </div>
    </header>
  )
}

export default Header