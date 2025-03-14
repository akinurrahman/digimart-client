import { ApiResponse, User } from "@/constants/interface-constants";
import generateApis from "@/services/api/rest-api";
import { getErrorMessage } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

type LoginPayload = { email: string; password: string }; // input type
type AuthResponse = {
  accessToken: string;
  user: User;
}; //respose type
type ErrorMessage = string; // error return type

export const loginApi = createAsyncThunk<
  ApiResponse<AuthResponse>,
  LoginPayload,
  { rejectValue: ErrorMessage }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const response = await generateApis("/auth/login").create(data);
    return response;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
