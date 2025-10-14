import { Link, useNavigate } from "react-router-dom"
import '../styles/Forms.css'


function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
     navigate('/home'); 
  };

  return (
  <div className="Login-container">
    <h2>Login</h2>
    <form className="LoginForm" onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" required /><br />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" required /><br />
      <div className="Login-btn">
        <button type="submit">Log in</button>
      </div>
    </form>
    <p>Don't have an account? <Link className="Login-redirect" to="/signup">Register here</Link></p>
  </div>
)
}

export default LoginForm