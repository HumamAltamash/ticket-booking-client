import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setCredentials, clearCredentials } from "../store/authSlice";
import { LoginUser, LogoutUser } from "../api/users";
import { LoginUserPayload } from "../types/user";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, accessToken, role } = useSelector(
    (state: RootState) => state.auth
  );

  const login = async (value: LoginUserPayload) => {
    const response = await LoginUser(value);
    const { user, accessToken, role } = response.data;
    dispatch(setCredentials({ user, accessToken, role }));
  };

  const logout = async () => {
    LogoutUser();

    dispatch(clearCredentials());
  };

  return { user, accessToken, role, login, logout };
};
