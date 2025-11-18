import axios from "axios";
import { requestInterceptor ,responseInterceptor } from "./InterceptorsService";

const BASEURL = "https://cloud9bet.dk";

export const Api = axios.create({
  baseURL: BASEURL,
   headers: { 'Content-Type': 'application/json'}
});

requestInterceptor(Api);
responseInterceptor(Api);
