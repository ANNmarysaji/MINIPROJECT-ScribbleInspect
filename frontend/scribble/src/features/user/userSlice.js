import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { customFetch } from "../../utils/axios";
import {
  addObjectToLocalStorage,
  getObjectFromLocalStorage,
  removeObjectFromLocalStorage,
} from "../../utils/localStorage";

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getObjectFromLocalStorage("user"),
  token: getObjectFromLocalStorage("token"),
  isTeacher:
    getObjectFromLocalStorage("user").user_type === "Teacher" ? true : false,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/users/register", {
        ...user,
        name: user.userName,
        user_type: user.userType,
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        Object.values(error.response.data).shift().shift()
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const tokenResp = await customFetch.post("/token/", user);
      const Response = { token: tokenResp.data };

      if (tokenResp.status === 200) {
        const userResponse = await customFetch.get("/users/me", {
          headers: { Authorization: `Bearer ${Response.token.access}` },
        });

        Response.user = userResponse.data;
      }

      return Response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, { payload }) => {
      const { type, message } = payload;
      state.user = null;
      state.isSidebarOpen = false;
      removeObjectFromLocalStorage("user");
      removeObjectFromLocalStorage("token");
      if (message) {
        if (type === "success") toast.success(message);
        else if (type === "error") toast.error(message);
        else if (type === "warning") toast.warning(message);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.user = payload;
        addObjectToLocalStorage("user", payload);
        state.isTeacher = payload.user_type === "Teacher" ? true : false;
        toast.success(`Hello There ${state.user.name.split(" ").shift()}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { token, user } = payload;
        state.isLoading = false;
        state.token = token;
        state.user = user;
        state.isTeacher = user.user_type === "Teacher" ? true : false;
        addObjectToLocalStorage("token", token);
        addObjectToLocalStorage("user", user);
        toast.success(`Welcome Back ${user.name.split(" ").shift()}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
