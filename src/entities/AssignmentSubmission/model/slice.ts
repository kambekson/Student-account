import {
  AssignmentSubmission,
  AssignmentSubmissionCreation,
  AssignmentSubmissionFilter,
  AssignmentSubmissionUpdate,
} from "./types";
import { UUID, WithPutLink } from "@/entities/Common";
import AssignmentSubmissionAPI from "../api/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DataStatus, ModelWithFiles } from "@/shared/lib/store/types";
import { AssignmentSubmissionMaterial } from "@/entities/AssignmentSubmissionMaterial";
import { AssignmentSubmissionMaterialAPI } from "@/entities/AssignmentSubmissionMaterial";
import { CommonAPI } from "@/entities/Common";
import { Pagination } from "@/entities/Common";

export const fetchAssignmentSubmissionsAsync = createAsyncThunk(
  "assignmentSubmissions/fetchMany",
  async (filter: AssignmentSubmissionFilter) => {
    return await AssignmentSubmissionAPI.fetchAssignmentSubmissions(filter);
  }
);

export const fetchAllAssignmentSubmissionsAsync = createAsyncThunk(
  "assignmentSubmissions/fetchAll",
  async (filter: AssignmentSubmissionFilter) => {
    filter = {
      ...filter,
      page: 1,
      pageSize: 100,
    };

    const firstPage = await AssignmentSubmissionAPI.fetchAssignmentSubmissions(
      filter
    );

    const requests: Promise<Pagination<AssignmentSubmission>>[] = [];
    for (let page = 1; page <= firstPage.metadata.totalPages; page++) {
      requests.push(
        AssignmentSubmissionAPI.fetchAssignmentSubmissions({
          ...filter,
          page,
        })
      );
    }

    const responses = await Promise.all(requests);
    const items = responses.flatMap((response) => response.items);

    return {
      metadata: { page: 1, totalPages: 1, totalItems: items.length },
      items,
    } as Pagination<AssignmentSubmission>;
  }
);

export const fetchAssignmentSubmissionAsync = createAsyncThunk(
  "assignmentSubmissions/fetchOne",
  async (id: UUID) => {
    return await AssignmentSubmissionAPI.fetchAssignmentSubmissionById(id);
  }
);

export const addAssignmentSubmissionAsync = createAsyncThunk(
  "assignmentSubmissions/add",
  async (creation: ModelWithFiles<AssignmentSubmissionCreation>) => {
    const assignmentSubmission: AssignmentSubmission =
      await AssignmentSubmissionAPI.createAssignmentSubmission(creation.model);

    if (!creation.files || creation.files.length === 0) {
      return assignmentSubmission;
    }

    await Promise.all(
      creation.files.map(async (file) => {
        const assignmentSubmissionWithPutLink: WithPutLink<AssignmentSubmissionMaterial> =
          await AssignmentSubmissionMaterialAPI.createAssignmentSubmissionMaterial(
            {
              submissionId: assignmentSubmission.id,
              schoolId: creation.model.schoolId,
              name: file.name,
            }
          );

        await CommonAPI.uploadFileOnServer(
          file,
          assignmentSubmissionWithPutLink.putLink
        );
      })
    );

    return assignmentSubmission;
  }
);

export const saveAssignmentSubmissionAsync = createAsyncThunk(
  "assignmentSubmissions/save",
  async ({ id, update }: { id: UUID; update: AssignmentSubmissionUpdate }) => {
    return await AssignmentSubmissionAPI.updateAssignmentSubmission(id, update);
  }
);

export const deleteAssignmentSubmissionAsync = createAsyncThunk(
  "assignmentSubmissions/delete",
  async (id: UUID) => {
    await AssignmentSubmissionAPI.deleteAssignmentSubmission(id);
  }
);

interface AssignmentSubmissionState {
  currentAssignmentSubmission: AssignmentSubmission | null;
  assignmentSubmissionPagination: Pagination<AssignmentSubmission> | null;
  status: DataStatus;
  error: string | null;
}

const assignmentSubmissionSlice = createSlice({
  name: "assignmentSubmission",
  initialState: {
    currentAssignmentSubmission: null,
    assignmentSubmissionPagination: null,
    status: DataStatus.IDLE,
    error: null,
  } as AssignmentSubmissionState,
  reducers: {
    clearCurrentAssignmentSubmission(state) {
      state.currentAssignmentSubmission = null;
    },
    clearAssignmentSubmissionPagination(state) {
      state.assignmentSubmissionPagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignmentSubmissionsAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(fetchAssignmentSubmissionsAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.assignmentSubmissionPagination = { ...action.payload };
      })
      .addCase(fetchAssignmentSubmissionsAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error =
          action.error.message || "Failed to fetch assignmentSubmissions";
      })

      .addCase(fetchAllAssignmentSubmissionsAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(
        fetchAllAssignmentSubmissionsAsync.fulfilled,
        (state, action) => {
          state.status = DataStatus.SUCCEEDED;
          state.assignmentSubmissionPagination = { ...action.payload };
        }
      )
      .addCase(fetchAllAssignmentSubmissionsAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error =
          action.error.message || "Failed to fetch assignmentSubmissions";
      })

      .addCase(fetchAssignmentSubmissionAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(fetchAssignmentSubmissionAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.currentAssignmentSubmission = { ...action.payload };
      })
      .addCase(fetchAssignmentSubmissionAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error =
          action.error.message || "Failed to fetch assignmentSubmissions";
      })

      .addCase(addAssignmentSubmissionAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(addAssignmentSubmissionAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.currentAssignmentSubmission = { ...action.payload };
      })
      .addCase(addAssignmentSubmissionAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error =
          action.error.message || "Failed to add assignmentSubmissions";
      })

      .addCase(saveAssignmentSubmissionAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(saveAssignmentSubmissionAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.currentAssignmentSubmission = { ...action.payload };
      })
      .addCase(saveAssignmentSubmissionAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error =
          action.error.message || "Failed to fetch assignmentSubmissions";
      })

      .addCase(deleteAssignmentSubmissionAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(deleteAssignmentSubmissionAsync.fulfilled, (state) => {
        state.status = DataStatus.SUCCEEDED;
      })
      .addCase(deleteAssignmentSubmissionAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error =
          action.error.message || "Failed to fetch assignmentSubmissions";
      });
  },
});

export default assignmentSubmissionSlice.reducer;
export const {
  clearCurrentAssignmentSubmission,
  clearAssignmentSubmissionPagination,
} = assignmentSubmissionSlice.actions;
