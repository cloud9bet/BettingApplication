import Balance from "./Balance"
import Deposit from "./Deposit"
import Logo from "./Logo"
import '../styles/Header.css'
import HomeBtn from "./HomeBtn"
import SettingsBtn from "./SettingsBtn"


function HeaderSettings() {

  return (
    <header className="header-container">
      <div className="header-logo">
        <Logo />
      </div>
      <div className="header-nav">
        <div className="header-homeBtn">
          <HomeBtn />
        </div>
      </div>
    </header>
  )
}

export default HeaderSettings