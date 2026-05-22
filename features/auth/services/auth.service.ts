import api from "@/services/api";
import {LoginPayload,SignupPayload} from "../types/auth.types";

export const loginUser =
  async (
    payload: LoginPayload
  ) => {

    const response =await api.post("/auth/signin",payload);
    return response.data;
};

export const signupUser =
  async (
    payload: SignupPayload
  ) => {

    const response =await api.post("/auth/signup",payload);
    return response.data;
};