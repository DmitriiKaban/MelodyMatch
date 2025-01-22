import axios from "axios";

const newRequest = axios.create({
  baseURL: "/auth",
  withCredentials: true,
});

newRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default newRequest;