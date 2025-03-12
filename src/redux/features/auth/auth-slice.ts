import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginApi } from "./auth-thunk";
import { User } from "@/constants/interface-constants";
import { removeFromLocalStorage, saveToLocalStorage } from "@/utils";
import { AUTH_USER_KEY } from "@/constants";

interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  redirectionPath: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  loading: false,
  redirectionPath: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      saveToLocalStorage(AUTH_USER_KEY, action.payload);
    },
    setRedirectionPath: (state, action: PayloadAction<string>) => {
      state.redirectionPath = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      removeFromLocalStorage(AUTH_USER_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginApi.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        saveToLocalStorage(AUTH_USER_KEY, action.payload.user);
      })
      .addCase(loginApi.rejected, (state) => {
        state.loading = false;
        state.accessToken = null;
      });
  },
});

export const { setAccessToken, setRedirectionPath, setUserInfo, logout } =
  authSlice.actions;
export default authSlice.reducer;
