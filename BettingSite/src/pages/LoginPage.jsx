import LoginForm from "../components/LoginForm"
import LogoImg from "../Images/Cloud9.png"
import '../styles/Login.css'

function LoginPage() {
  return (
  <div className="Loginpage-container">
    <div className="Log-img-container">
    <img src={LogoImg} alt="Cloud9Bet" className="Log-img" />
    </div>
    <LoginForm/>
  </div>
  )
}

export default LoginPage
