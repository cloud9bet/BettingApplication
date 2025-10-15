import SignUpForm from "../components/SignUpForm"
import LogoImg from "../Images/Cloud9.png"
import Footer from "../components/Footer"
import '../styles/Login.css'

function SignUpPage() {
  return (
    <div className="main-container">
  <div className="SignUp-page-container">
  <div className="Log-img-container">
    <img src={LogoImg} alt="Cloud9Bet" className="Log-img" />
    </div>
    <SignUpForm/>
  </div>
    <Footer/>
  </div>
  )
}

export default SignUpPage
