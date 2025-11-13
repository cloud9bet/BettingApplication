import axios from "axios";
import { requestInterceptor ,responseInterceptor } from "./IntercepotorsService";

const BASEURL = "https://localhost:7203";

export const Api = axios.create({
  baseURL: BASEURL,
   headers: { 'Content-Type': 'application/json'}
});

requestInterceptor(Api);
responseInterceptor(Api);
