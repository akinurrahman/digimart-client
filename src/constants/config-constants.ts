export const authenticationRoutes = ["/login", "/register"];

export const defaultProtectedRoutes: Record<string, string> = {
  user: "/home",
  admin: "/dashboard",
};
