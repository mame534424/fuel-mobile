import axios from "axios";

const api = axios.create({
  baseURL: "https://fuel-system-2qw7.onrender.com",
  
  headers: {
    "Content-Type": "application/json",
  },

  timeout: 10000,
});

export default api;