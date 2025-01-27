import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://back.tunify.md:8081/api/",
  withCredentials: true,
});

export default newRequest;