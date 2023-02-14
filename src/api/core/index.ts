import axios from "axios";
import { API_KEY, HOST_ADDRESS } from "../../constants";

axios.defaults.baseURL = HOST_ADDRESS;
axios.defaults.headers.common["Authorization"] = API_KEY;
axios.defaults.headers.common["Content-Type"] =
  "application/json;charset=UTF-8";
const instance = axios.create({
  url: "/book",
  method: "get",
  baseURL: HOST_ADDRESS,
});

export default instance;
