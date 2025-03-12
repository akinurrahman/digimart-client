"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  authenticationRoutes,
  defaultProtectedRoutes,
} from "@/constants/config-constants";
import { setRedirectionPath } from "@/redux/features/auth/auth-slice";
import { FullPageLoader } from "../ui/loader";

interface RoleProtectionProviderProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const RoleProtectionProvider = ({
  children,
  allowedRoles = [],
}: RoleProtectionProviderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuthRoute = authenticationRoutes.includes(pathname);

    if (!user) {
      // If there is no user logged in, redirect to login page
      if (allowedRoles.length > 0) {
        dispatch(setRedirectionPath(pathname));
      }
      router.replace("/login");
      setLoading(false);
      return;
    } else {
      if (isAuthRoute) {
        // Redirect to the default protected route based on user role
        const defaultRoute = defaultProtectedRoutes[user.role];
        router.replace(defaultRoute || "/");
        setLoading(false);
      } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        // Redirect to access denied page if the role is not allowed
        router.replace("/access-denied");
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  }, [user, allowedRoles, router, pathname, dispatch]);

  if (loading) return <FullPageLoader />;

  return <>{children}</>;
};

export default RoleProtectionProvider;
