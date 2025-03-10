import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setCredentials, clearCredentials } from "../store/authSlice";
import { axiosInstance } from "../api";
import { LoginUser } from "../api/users";
import { LoginUserPayload } from "../types/user";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, accessToken } = useSelector((state: RootState) => state.auth);

  const login = async (value: LoginUserPayload) => {
    const { user, accessToken } = await LoginUser(value);
    dispatch(setCredentials({ user: user, accessToken: accessToken }));
  };

  const logout = async () => {
    await axiosInstance.post("/auth/logout");
    dispatch(clearCredentials());
  };

  return { user, accessToken, login, logout };
};
