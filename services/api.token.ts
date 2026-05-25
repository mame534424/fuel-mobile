import axios from "axios";

import {
  useAuthStore,
} from "@/features/auth/stores/auth.stores";

const apiToken = axios.create({

  baseURL:
    "http://10.214.9.140:5001",

  headers: {
    "Content-Type":
      "application/json",
  },

  timeout: 10000,
});

apiToken.interceptors.request.use(

  (config) => {

    const token =
      useAuthStore
        .getState()
        .token;

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {

    return Promise.reject(error);
  }
);

export default apiToken;