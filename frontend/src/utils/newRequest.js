import axios from "axios";

const newRequest = axios.create({
  baseURL: "/auth", // Proxy points this to the backend
  // withCredentials: true, // Uncomment if your backend uses cookies
});


newRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("Intercepting request...");
  console.log("Request URL:", config.url);
  console.log("Request Method:", config.method);
  console.log("Request Headers:", config.headers);
  console.log("Request Data:", config.data);

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

export default newRequest;
