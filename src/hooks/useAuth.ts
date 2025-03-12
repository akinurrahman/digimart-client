import { useEffect, useState } from "react";
import { AUTH_USER_KEY } from "@/constants";
import { setUserInfo, logout } from "@/redux/features/auth/auth-slice";
import { getFromLocalStorage } from "@/utils";
import { refreshToken } from "@/services/api/auth-service";
import { useAppDispatch } from "@/redux/hooks";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = getFromLocalStorage(AUTH_USER_KEY);

    const initializeAuth = async () => {
      try {
        if (savedUser) {
          await refreshToken();
          if (typeof savedUser === "object") {
            dispatch(setUserInfo(savedUser));
          } else {
            dispatch(logout());
          }
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [dispatch]);

  return loading;
};
