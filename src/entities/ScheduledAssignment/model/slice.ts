import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  ScheduledAssignment,
  ScheduledAssignmentFilter,
} from "@/entities/ScheduledAssignment";
import { Pagination } from "@/entities/Common";
import ScheduledAssignmentAPI from "../api/api";
import { UUID } from "@/entities/Common";
import { DataStatus } from "@/shared/lib/store/types";

export const fetchScheduledAssignmentsAsync = createAsyncThunk(
  "scheduledAssignment/fetchMany",
  async (filter: ScheduledAssignmentFilter) => {
    return await ScheduledAssignmentAPI.fetchScheduledAssignments(filter);
  }
);

export const fetchAllScheduledAssignmentsAsync = createAsyncThunk(
  "scheduledAssignment/fetchAll",
  async (filter: ScheduledAssignmentFilter) => {
    filter = {
      ...filter,
      page: 1,
      pageSize: 100,
    };

    const firstPage = await ScheduledAssignmentAPI.fetchScheduledAssignments(
      filter
    );

    const requests: Promise<Pagination<ScheduledAssignment>>[] = [];
    for (let page = 1; page <= firstPage.metadata.totalPages; page++) {
      requests.push(
        ScheduledAssignmentAPI.fetchScheduledAssignments({ ...filter, page })
      );
    }

    const responses = await Promise.all(requests);
    const items = responses.flatMap((response) => response.items);

    return {
      metadata: {
        page: 1,
        totalPages: 1,
        totalItems: items.length,
      },
      items,
    } as Pagination<ScheduledAssignment>;
  }
);
export const fetchScheduledAssignmentAsync = createAsyncThunk(
  "scheduledAssignment/fetchOne",
  async (id: UUID) => {
    return await ScheduledAssignmentAPI.fetchScheduledAssignmentById(id);
  }
);

interface ScheduledAssignmentState {
  currentScheduledAssignment: ScheduledAssignment | null;
  scheduledAssignmentsPagination: Pagination<ScheduledAssignment> | null;
  status: DataStatus;
  error: string | null;
}

const scheduledAssignmentSlice = createSlice({
  name: "scheduledAssignment",
  initialState: {
    currentScheduledAssignment: null,
    scheduledAssignmentsPagination: null,
    status: DataStatus.IDLE,
    error: null,
  } as ScheduledAssignmentState,
  reducers: {
    clearCurrentScheduledAssignment(state) {
      state.currentScheduledAssignment = null;
    },
    clearScheduledAssignmentsPagination(state) {
      state.scheduledAssignmentsPagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScheduledAssignmentsAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(fetchScheduledAssignmentsAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.scheduledAssignmentsPagination = { ...action.payload };
      })
      .addCase(fetchScheduledAssignmentsAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error =
          action.error.message || "Failed to fetch group courses list";
      })

      .addCase(fetchAllScheduledAssignmentsAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(fetchAllScheduledAssignmentsAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.scheduledAssignmentsPagination = { ...action.payload };
      })
      .addCase(fetchAllScheduledAssignmentsAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error =
          action.error.message || "Failed to fetch group courses list";
      })

      .addCase(fetchScheduledAssignmentAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(fetchScheduledAssignmentAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.currentScheduledAssignment = { ...action.payload };
      })
      .addCase(fetchScheduledAssignmentAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to fetch group course";
      });
  },
});

export default scheduledAssignmentSlice.reducer;
export const {
  clearCurrentScheduledAssignment,
  clearScheduledAssignmentsPagination,
} = scheduledAssignmentSlice.actions;
