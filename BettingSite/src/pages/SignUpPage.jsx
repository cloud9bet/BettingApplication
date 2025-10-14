import SignUpForm from "../components/SignUpForm"
import LogoImg from "../Images/Cloud9.png"
import '../styles/Login.css'

function SignUpPage() {
  return (
  <div className="SignUp-page-container">
  <div className="Log-img-container">
    <img src={LogoImg} alt="Cloud9Bet" className="Log-img" />
    </div>
    <SignUpForm/>
  </div>
  )
}

export default SignUpPage
