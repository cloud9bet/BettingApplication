import { Link, useNavigate } from "react-router-dom"
import '../styles/Login.css'
import { useState } from "react";
import { login } from "../services/ControllerService/authApi";



function LoginForm() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(userName, password);

    if (result) {
      navigate('/');
    } else {
      alert("Login failed due to wrong username or password");
    }
  };


  return (
    <div className="Login-container">
      <h2>Login</h2>
      <form className="LoginForm" onSubmit={handleSubmit}>
        <div className="Login-form-row">
          <label htmlFor="name">Username</label>
          <input type="text" id="name" data-testid="name" value={userName} name="name" placeholder="Enter name" required onChange={(e) => setUserName(e.target.value)} />
        </div>

        <div className="Login-form-row">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" data-testid="password" value={password} name="password" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Log in</button>

      </form>
      <p>Don't have an account? <Link className="Login-redirect" to="/signup">Register here</Link></p>
    </div>
  )
}

export default LoginForm