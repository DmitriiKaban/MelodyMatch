import axios from "axios";

const accRequest = axios.create({
  baseURL: "/account",
  
});

accRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {

    if (token.split(".").length === 3) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.error("Invalid token format:", token);
      localStorage.removeItem("token"); 
    }
  }

  return config;
});

export default accRequest;