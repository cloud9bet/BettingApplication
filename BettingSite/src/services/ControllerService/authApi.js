import axios from "axios";
import { useNavigate } from "react-router-dom"

//ændrer logic til at gemme tokens i lokalStorage og slet console.log

const BASEURL = "https://cloud9bet.dk";


export const AuthApi = axios.create({
  baseURL: BASEURL,
   headers: { 'Content-Type': 'application/json'}
});

export async function login(username, password) {
  try {
    const response = await AuthApi.post('/Auth/login', {
      username,
      password
    });
    //sæt i lokal storage for tokens
    const {jwTtoken, refreshToken} = response.data;

    localStorage.setItem("JWT", jwTtoken);
    localStorage.setItem("refreshToken", refreshToken);
    
    console.log(response.data);
    return true;
  } catch (error) {
    console.error(error.response?.data || error.message);
    return false;
  }
}

export async function register(username, password) {
  try {
    const response = await AuthApi.post('/Auth/register', {
      username,
      password
    });
    //redirct til login
    console.log(response.data);
    return true;
  } catch (error) {
    console.error(error.response?.data || error.message);
    return false;
  }
}

