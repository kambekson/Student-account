import { User, UserFilter } from "./types";
import { Pagination } from "@/entities/Common";
import UserAPI from "../api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DataStatus } from "@/shared/lib/store/types";
import { UUID } from "@/entities/Common";

export const fetchUsersAsync = createAsyncThunk(
  "users/fetchMany",
  async (filter: UserFilter) => {
    return await UserAPI.fetchUsers(filter);
  }
);

export const fetchAllUsersAsync = createAsyncThunk(
  "users/fetchAll",
  async (filter: UserFilter) => {
    filter = {
      ...filter,
      page: 1,
      pageSize: 100,
    };

    const firstPage = await UserAPI.fetchUsers(filter);

    const requests: Promise<Pagination<User>>[] = [];
    for (let page = 1; page <= firstPage.metadata.totalPages; page++) {
      requests.push(UserAPI.fetchUsers({ ...filter, page }));
    }

    const responses = await Promise.all(requests);
    const items = responses.flatMap((response) => response.items);

    return {
      metadata: { page: 1, totalPages: 1, totalItems: items.length },
      items,
    } as Pagination<User>;
  }
);

export const fetchUserAsync = createAsyncThunk(
  "users/fetchOne",
  async (id: UUID) => {
    return await UserAPI.fetchUserById(id);
  }
);

interface UserState {
  currentUser: User | null;
  userPagination: Pagination<User> | null;
  status: DataStatus;
  error: string | null;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    userPagination: null,
    status: DataStatus.IDLE,
    error: null,
  } as UserState,
  reducers: {
    clearUserPagination(state) {
      state.userPagination = null;
    },
    clearCurrentUser(state) {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.userPagination = { ...action.payload };
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to fetch users";
      })

      .addCase(fetchAllUsersAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.userPagination = { ...action.payload };
      })
      .addCase(fetchAllUsersAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to fetch users";
      })

      .addCase(fetchUserAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.currentUser = action.payload;
      })
      .addCase(fetchUserAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export default userSlice.reducer;
export const { clearCurrentUser, clearUserPagination } = userSlice.actions;
