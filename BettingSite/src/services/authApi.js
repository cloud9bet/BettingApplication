import axios from "axios";

//ændrer logic til at gemme tokens i lokalStorage

const BASEURL = "https://localhost:7203";

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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
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
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}
