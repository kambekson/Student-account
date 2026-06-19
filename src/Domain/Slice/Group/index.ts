import { UUID } from "@/Common/Entity/Base/Common";
import { Group, GroupFilter } from "@/Common/Entity/Base/GroupCourse";
import GroupAPI from "@/Transport/api/Group";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DataStatus } from "..";
import { Pagination } from "@/Common/Entity/Pagination";

export const fetchGroupsAsync = createAsyncThunk(
  "groups/fetchMany",
  async (filter: GroupFilter) => {
    return await GroupAPI.fetchGroups(filter);
  }
);

export const fetchAllGroupsAsync = createAsyncThunk(
  "groups/fetchAll",
  async (filter: GroupFilter) => {
    filter = {
      ...filter,
      page: 1,
      pageSize: 100,
    };

    const firstPage = await GroupAPI.fetchGroups(filter);

    const requests: Promise<Pagination<Group>>[] = [];
    for (let page = 1; page <= firstPage.metadata.totalPages; page++) {
      requests.push(GroupAPI.fetchGroups({ ...filter, page }));
    }

    const responses = await Promise.all(requests);
    const items = responses.flatMap((response) => response.items);

    return {
      metadata: { page: 1, totalPages: 1, totalItems: items.length },
      items,
    } as Pagination<Group>;
  }
);

export const fetchGroupAsync = createAsyncThunk(
  "groups/fetchOne",
  async (id: UUID) => {
    return await GroupAPI.fetchGroupById(id);
  }
);

interface GroupState {
  currentGroup: Group | null;
  groupPagination: Pagination<Group> | null;
  status: DataStatus;
  error: string | null;
}

const groupSlice = createSlice({
  name: "group",
  initialState: {
    currentGroup: null,
    groupPagination: null,
    status: DataStatus.IDLE,
    error: null,
  } as GroupState,
  reducers: {
    clearCurrentGroup(state) {
      state.currentGroup = null;
    },
    clearGroupPagination(state) {
      state.groupPagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupsAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(fetchGroupsAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.groupPagination = { ...action.payload };
      })
      .addCase(fetchGroupsAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to fetch groups";
      })

      .addCase(fetchAllGroupsAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(fetchAllGroupsAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.groupPagination = { ...action.payload };
      })
      .addCase(fetchAllGroupsAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to fetch groups";
      })

      .addCase(fetchGroupAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(fetchGroupAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.currentGroup = { ...action.payload };
      })
      .addCase(fetchGroupAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to fetch groups";
      });
  },
});

export default groupSlice.reducer;
export const { clearCurrentGroup, clearGroupPagination } = groupSlice.actions;
