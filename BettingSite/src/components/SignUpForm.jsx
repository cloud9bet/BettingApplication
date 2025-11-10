import { Link, useNavigate } from "react-router-dom"
import '../styles/Login.css'
import { useState } from "react";


function SignUpForm() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPassowrdAgain] = useState("");

 
  
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };
// vi skal huske at tilføje krav til password
  return (
    <div className="SignUp-container">
      <h2>Sign-Up</h2>
      <form className="SignUpForm" onSubmit={handleSubmit}>
        <div className="SignUp-form-row">
          <label htmlFor="name">Username</label>
          <input type="text" id="name" data-testid = "name" value={userName} name="name" placeholder="Enter name" required  onChange={(e)=>setUserName(e.target.value)}/>
        </div>
        <div className="SignUp-form-row">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" data-testid = "password" value={password} name="password" placeholder="Enter password" required onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className="SignUp-form-row">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" data-testid = "passwordAgain" value={passwordAgain} placeholder="Repeat password" required  onChange={(e)=>setPassowrdAgain(e.target.value)}/>
        </div>
        <button type="submit">Sign up</button>
      </form>
      <p>Have an account? <Link className="SignUp-redirect" to="/">Login here</Link></p>
    </div>
  )
}

export default SignUpForm