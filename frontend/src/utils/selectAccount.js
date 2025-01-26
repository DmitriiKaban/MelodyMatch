import axios from "axios";

const selectAccount = axios.create({
  baseURL: "/select-account-type",
  headers: {
    "Content-Type": "application/json",
  },
  
});

export default selectAccount;