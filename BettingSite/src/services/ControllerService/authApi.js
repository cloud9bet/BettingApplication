import axios from "axios";
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

    const {jwTtoken, refreshToken} = response.data;

    sessionStorage.setItem("JWT", jwTtoken);
    sessionStorage.setItem("refreshToken", refreshToken);
    
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
    console.log(response.data);
    return true;
  } catch (error) {
    console.error(error.response?.data || error.message);
    return false;
  }
}

