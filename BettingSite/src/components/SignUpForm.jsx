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
        <div className="SignUp-form-row">
          <label htmlFor="name">Username</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="SignUp-form-row">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className="SignUp-form-row">
          <label htmlFor="password">Repeat Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Sign up</button>
      </form>
      <p>Have an account? <Link className="SignUp-redirect" to="/">Login here</Link></p>
    </div>
  )
}

export default SignUpForm