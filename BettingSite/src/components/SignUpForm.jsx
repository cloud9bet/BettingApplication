import { Link, useNavigate } from "react-router-dom"
import '../styles/Forms.css'


function SignUpForm() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
      navigate('/'); 
  };

  return (
  <div className="SignUp-container">
    <h2>Sign-Up</h2>
    <form className="SignUpForm" onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" required /><br />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" required /><br />
      <div className="Login-btn">
        <button type="submit">Sign up</button>
      </div>
    </form>
    <p>Have an account? <Link className="SignUp-redirect" to="/">Login here</Link></p>
  </div>
)
}

export default SignUpForm