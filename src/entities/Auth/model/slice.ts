import { Auth } from "./types";
import { UUID } from "@/entities/Common";
import { User } from "@/entities/User";
import { getUserIdFromToken } from "@/shared/lib/utils";
import authService from "../lib/service";
import { UserAPI } from "@/entities/User";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const loginAndFetchUserAsync = createAsyncThunk(
  "auth/loginAndFetchUser",
  async (credentials: Auth, { rejectWithValue }) => {
    try {
      const { access } = await authService.login(credentials);

      const userId = getUserIdFromToken(access);
      if (!userId) throw new Error("Failed to extract userId from token");

      const user = await UserAPI.fetchUserById(userId);

      return { user, token: access };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const checkAuthAsync = createAsyncThunk("auth/checkAuth", async () => {
  try {
    if (await authService.checkLogout())
      return { isAuthenticated: false, user: null, token: null };

    const { access } = await authService.checkAuth();

    const userId = getUserIdFromToken(access);
    if (!userId) throw new Error("Failed to extract userId from token");

    const user = await UserAPI.fetchUserById(userId);

    return { user, token: access, isAuthenticated: true };
  } catch {
    return { isAuthenticated: false, user: null, token: null };
  }
});

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (id: UUID, { rejectWithValue }) => {
    try {
      return await UserAPI.fetchUserById(id);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Get user failed"
      );
    }
  }
);

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isAuthloading: boolean;
  authError: string | null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    token: null,
    isAuthloading: false,
    authError: null,
  } as AuthState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      authService.logout();
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAndFetchUserAsync.pending, (state) => {
        state.isAuthloading = true;
        state.authError = null;
      })
      .addCase(loginAndFetchUserAsync.fulfilled, (state, action) => {
        state.isAuthloading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginAndFetchUserAsync.rejected, (state, action) => {
        state.isAuthloading = false;
        state.authError = action.payload as string;
      })

      .addCase(checkAuthAsync.pending, (state) => {
        state.isAuthloading = true;
        state.authError = null;
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.isAuthloading = false;

        state.isAuthenticated = action.payload.isAuthenticated;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.isAuthloading = false;
        state.authError = action.payload as string;
      })

      .addCase(getUser.pending, (state) => {
        state.isAuthloading = true;
        state.authError = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthloading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthloading = false;
        state.authError = action.payload as string;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
