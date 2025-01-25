import axios from "axios";

const accRequest = axios.create({
  baseURL: "/account",
  
});

export default accRequest;