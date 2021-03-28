import axios, { AxiosResponse } from "axios";
import { userType } from "../common/types";

const instanse = axios.create({
  baseURL: "http://localhost:3001/api/auth/",
  withCredentials: true,
});

export const authAPI = {
  signUp: (
    data: userType
  ): Promise<AxiosResponse<{ user: userType; accessToken: string }>> => {
    return instanse.post("sign-up", { ...data });
  },
  logIn: (
    email: string,
    password: string
  ): Promise<AxiosResponse<{ user: userType; accessToken: string }>> => {
    return instanse.post("log-in", { email, password });
  },
  getUser: (userID: string): Promise<AxiosResponse<userType>> => {
    return instanse.get(`user?userID=${userID}`);
  },
};
