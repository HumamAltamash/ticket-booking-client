import { LoginUserPayload, RegisterUserPayload } from "../types/user";
import { axiosInstance } from "./index";

export const RegisterUser = async (value: RegisterUserPayload) => {
  try {
    const response = await axiosInstance.post("api/auth/register", value);
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};

export const LoginUser = async (value: LoginUserPayload) => {
  try {
    const response = await axiosInstance.post("api/auth/login", value);
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};

export const refreshToken = async () => {
  try {
    const response = await axiosInstance.post("api/auth/refresh");
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};
