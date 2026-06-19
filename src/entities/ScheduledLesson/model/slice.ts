import { UUID } from "@/entities/Common";
import {
  ScheduledLesson,
  ScheduledLessonFilter,
} from "./types";
import { Pagination } from "@/entities/Common";
import ScheduledLessonAPI from "../api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DataStatus } from "@/shared/lib/store/types";

export const fetchScheduledLessonsAsync = createAsyncThunk(
  "scheduledLesson/fetchMany",
  async (filter: ScheduledLessonFilter) => {
    return await ScheduledLessonAPI.fetchScheduledLessons(filter);
  }
);

export const fetchAllScheduledLessonsAsync = createAsyncThunk(
  "scheduledLesson/fetchAll",
  async (filter: ScheduledLessonFilter) => {
    filter = {
      ...filter,
      page: 1,
      pageSize: 100,
    };

    const firstPage = await ScheduledLessonAPI.fetchScheduledLessons(filter);

    const requests: Promise<Pagination<ScheduledLesson>>[] = [];
    for (let page = 1; page <= firstPage.metadata.totalPages; page++) {
      requests.push(
        ScheduledLessonAPI.fetchScheduledLessons({ ...filter, page })
      );
    }

    const responses = await Promise.all(requests);
    const items = responses.flatMap((response) => response.items);

    return {
      metadata: { page: 1, totalPages: 1, totalItems: items.length },
      items,
    } as Pagination<ScheduledLesson>;
  }
);

export const fetchScheduledLessonAsync = createAsyncThunk(
  "scheduledLesson/fetchOne",
  async (id: UUID) => {
    return await ScheduledLessonAPI.fetchScheduledLessonById(id);
  }
);

interface ScheduledLessonState {
  currentScheduledLesson: ScheduledLesson | null;
  scheduledLessonsPagination: Pagination<ScheduledLesson> | null;
  status: DataStatus;
  error: string | null;
}

const scheduledLessonSlice = createSlice({
  name: "scheduledLesson",
  initialState: {
    currentScheduledLesson: null,
    scheduledLessonsPagination: null,
    status: DataStatus.IDLE,
    error: null,
  } as ScheduledLessonState,
  reducers: {
    clearCurrentScheduledLesson(state) {
      state.currentScheduledLesson = null;
    },
    clearScheduledLessonPagination(state) {
      state.scheduledLessonsPagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScheduledLessonsAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(fetchScheduledLessonsAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.scheduledLessonsPagination = { ...action.payload };
      })
      .addCase(fetchScheduledLessonsAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error =
          action.error.message || "Failed to fetch group courses list";
      })

      .addCase(fetchAllScheduledLessonsAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(fetchAllScheduledLessonsAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.scheduledLessonsPagination = { ...action.payload };
      })
      .addCase(fetchAllScheduledLessonsAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error =
          action.error.message || "Failed to fetch group courses list";
      })

      .addCase(fetchScheduledLessonAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(fetchScheduledLessonAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.currentScheduledLesson = { ...action.payload };
      })
      .addCase(fetchScheduledLessonAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to fetch group course";
      });
  },
});

export default scheduledLessonSlice.reducer;
export const { clearCurrentScheduledLesson, clearScheduledLessonPagination } =
  scheduledLessonSlice.actions;
