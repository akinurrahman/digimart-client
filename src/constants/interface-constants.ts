export interface User {
  email: string;
  role: "user" | "admin";
  name: string;
  avatar: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
}
