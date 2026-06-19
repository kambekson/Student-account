import {
  GroupCourse,
  GroupCourseFilter,
} from "@/Common/Entity/Base/GroupCourse";
import { Pagination } from "@/Common/Entity/Pagination";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DataStatus } from "..";
import GroupCourseAPI from "@/Transport/api/GroupCourse";
import { UUID } from "@/Common/Entity/Base/Common";

export const fetchGroupCoursesAsync = createAsyncThunk(
  "groupCourses/fetchMany",
  async (filter: GroupCourseFilter): Promise<Pagination<GroupCourse>> => {
    return await GroupCourseAPI.fetchGroupCourses(filter);
  }
);

export const fetchAllGroupCoursesAsync = createAsyncThunk(
  "groupCourses/fetchAll",
  async (filter: GroupCourseFilter): Promise<Pagination<GroupCourse>> => {
    filter = {
      ...filter,
      page: 1,
      pageSize: 100,
    };

    const firstPage = await GroupCourseAPI.fetchGroupCourses(filter);

    const requests: Promise<Pagination<GroupCourse>>[] = [];
    for (let page = 1; page <= firstPage.metadata.totalPages; page++) {
      requests.push(
        GroupCourseAPI.fetchGroupCourses({
          ...filter,
          page,
        })
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
    } as Pagination<GroupCourse>;
  }
);

export const fetchGroupCourseAsync = createAsyncThunk(
  "groupCourses/fetchOne",
  async (id: UUID): Promise<GroupCourse> => {
    return await GroupCourseAPI.fetchGroupCourseById(id);
  }
);

interface GroupCourseState {
  currentGroupCourse: GroupCourse | null;
  groupCoursesPagination: Pagination<GroupCourse> | null;
  status: DataStatus;
  error: string | null;
}

const groupCourseSlice = createSlice({
  name: "groupCourse",
  initialState: {
    currentGroupCourse: null,
    groupCoursesPagination: null,
    status: DataStatus.IDLE,
    error: null,
  } as GroupCourseState,
  reducers: {
    clearCurrentGroupCourse(state) {
      state.currentGroupCourse = null;
    },
    clearGroupCoursePagination(state) {
      state.groupCoursesPagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupCoursesAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(fetchGroupCoursesAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.groupCoursesPagination = { ...action.payload };
      })
      .addCase(fetchGroupCoursesAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error =
          action.error.message || "Failed to fetch group courses list";
      })

      .addCase(fetchAllGroupCoursesAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(fetchAllGroupCoursesAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.groupCoursesPagination = { ...action.payload };
      })
      .addCase(fetchAllGroupCoursesAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error =
          action.error.message || "Failed to fetch group courses list";
      })

      .addCase(fetchGroupCourseAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(fetchGroupCourseAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.currentGroupCourse = { ...action.payload };
      })
      .addCase(fetchGroupCourseAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to fetch group course";
      });
  },
});

export default groupCourseSlice.reducer;
export const { clearCurrentGroupCourse, clearGroupCoursePagination } =
  groupCourseSlice.actions;
