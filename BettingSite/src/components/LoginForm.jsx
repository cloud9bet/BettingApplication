import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { login } from "../services/ControllerService/authApi";
import { jwtDecode } from "jwt-decode";
import '../styles/Login.css';



function LoginForm() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(userName, password);

    if (result) {
      const token = sessionStorage.getItem("JWT");
      const payload = jwtDecode(token);
      const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      if (role == "User") {
        navigate("/");
      } else {
        alert("Login failed Due To Access Rights");
      }
    } else {
      alert("Login failed Due To Wrong Credentials");
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