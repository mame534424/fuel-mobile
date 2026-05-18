import axios from "axios";

const api = axios.create({
  baseURL: "http://10.127.60.140:5001",
  
  headers: {
    "Content-Type": "application/json",
  },

  timeout: 10000,
});

export default api;