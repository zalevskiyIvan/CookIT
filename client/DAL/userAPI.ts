import axios, { AxiosError, AxiosResponse } from "axios";
import { recipeType, fullInfo, userType } from "../common/types";

const instanse = axios.create({
  baseURL: "http://localhost:3001/api/user/",
  withCredentials: true,
});

export const userAPI = {
  signUp: (
    data: userType
  ): Promise<AxiosResponse<{ user: userType; accessToken: string }>> => {
    return instanse.post("sign-up", data);
  },
  logIn: (
    email: string,
    password: string
  ): Promise<AxiosResponse<{ user: userType; accessToken: string }>> => {
    return instanse.post("log-in", { email, password });
  },
  authCheck: (): any => {
    return instanse.get("auth-check").catch((error: any) => ({ error }));
  },
  getUser: (userID: string): Promise<AxiosResponse<userType>> => {
    return instanse.get(`user?userID=${userID}`);
  },
  getProfile: (username: string): Promise<AxiosResponse<userType>> => {
    return instanse.get(`user-profile?username=${username}`);
  },
  getMyProfile: (): Promise<{
    data?: AxiosResponse<userType>;
    error?: AxiosError;
  }> => {
    return instanse.get(`my-profile`).catch((error: AxiosError) => ({ error }));
  },
  uploadAvatar: (
    formData: FormData
  ): Promise<{ data?: AxiosResponse<string>; error?: AxiosError }> => {
    return instanse
      .post(`upload-avatar`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .catch((error: any) => ({ error }));
  },
  updateFullInfo: (
    data: fullInfo
  ): Promise<{ data?: AxiosResponse<void>; error?: AxiosError }> => {
    return instanse
      .post("update-info", data)
      .catch((error: AxiosError) => ({ error }));
  },
  subscribe: (
    otherID: string
  ): Promise<{ error?: AxiosError; data?: AxiosResponse<void> }> => {
    return instanse
      .put("subscribe", { otherID })
      .catch((error: AxiosError) => ({ error }));
  },
};
