import axios from "axios";

const newRequest = axios.create({
  baseURL: "/auth",
  withCredentials: true,
});

export default newRequest;