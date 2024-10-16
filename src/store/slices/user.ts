import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  user: { username: string; password: string } | null;
  status: "idle" | "loading" | "failed" | "success";
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/login",
        user
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "failed to login";
    });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
