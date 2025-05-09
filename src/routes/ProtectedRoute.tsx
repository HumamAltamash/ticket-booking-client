import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { refreshToken } from "../api/users";
import { setCredentials } from "../store/authSlice";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (user === undefined || user === null) {
        try {
          const response = await refreshToken();

          if (response.success) {
            dispatch(
              setCredentials({
                user: response.data.user,
                accessToken: response.data.accessToken,
              })
            );
          }
        } catch (error) {
          console.error("Session refresh failed:", error);
        }
      }
      setCheckingAuth(false);
    };

    checkAuth();
  }, [dispatch, user]);

  if (checkingAuth) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
