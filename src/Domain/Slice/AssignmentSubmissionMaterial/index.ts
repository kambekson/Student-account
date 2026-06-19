import {
  AssignmentSubmissionMaterial,
  AssignmentSubmissionMaterialFilter,
} from "@/Common/Entity/Base/AssignmentSubmissionMaterial";
import { UUID } from "@/Common/Entity/Base/Common";
import AssignmentSubmissionMaterialAPI from "@/Transport/api/AssignmentSubmissionMaterial";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DataStatus } from "..";
import { Pagination } from "@/Common/Entity/Pagination";

export const fetchAssignmentSubmissionMaterialsAsync = createAsyncThunk(
  "assignmentSubmissionMaterials/fetchMany",
  async (filter: AssignmentSubmissionMaterialFilter) => {
    return await AssignmentSubmissionMaterialAPI.fetchAssignmentSubmissionMaterials(
      filter
    );
  }
);

export const fetchAllAssignmentSubmissionMaterialsAsync = createAsyncThunk(
  "assignmentSubmissionMaterials/fetchAll",
  async (filter: AssignmentSubmissionMaterialFilter) => {
    filter = {
      ...filter,
      page: 1,
      pageSize: 100,
    };

    const firstPage =
      await AssignmentSubmissionMaterialAPI.fetchAssignmentSubmissionMaterials(
        filter
      );

    const requests: Promise<Pagination<AssignmentSubmissionMaterial>>[] = [];
    for (let page = 1; page <= firstPage.metadata.totalPages; page++) {
      requests.push(
        AssignmentSubmissionMaterialAPI.fetchAssignmentSubmissionMaterials({
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
    } as Pagination<AssignmentSubmissionMaterial>;
  }
);

export const fetchAssignmentSubmissionMaterialAsync = createAsyncThunk(
  "assignmentSubmissionMaterials/fetchOne",
  async (id: UUID) => {
    return await AssignmentSubmissionMaterialAPI.fetchAssignmentSubmissionMaterialById(
      id
    );
  }
);

export const deleteAssignmentSubmissionMaterialAsync = createAsyncThunk(
  "assignmentSubmissionMaterials/delete",
  async (id: UUID) => {
    return await AssignmentSubmissionMaterialAPI.deleteAssignmentSubmissionMaterial(
      id
    );
  }
);

interface AssignmentSubmissionMaterialState {
  currentAssignmentSubmissionMaterial: AssignmentSubmissionMaterial | null;
  assignmentSubmissionMaterialsPagination: Pagination<AssignmentSubmissionMaterial> | null;
  status: DataStatus;
  error: string | null;
}

const assignmentSubmissionMaterialSlice = createSlice({
  name: "assignmentSubmissionMaterial",
  initialState: {
    currentAssignmentSubmissionMaterial: null,
    assignmentSubmissionMaterialsPagination: null,
    status: DataStatus.IDLE,
    error: null,
  } as AssignmentSubmissionMaterialState,
  reducers: {
    clearCurrentAssignmentSubmissionMaterial(state) {
      state.currentAssignmentSubmissionMaterial = null;
    },
    clearAssignmentSubmissionMaterialPagination(state) {
      state.assignmentSubmissionMaterialsPagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignmentSubmissionMaterialsAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(
        fetchAssignmentSubmissionMaterialsAsync.fulfilled,
        (state, action) => {
          state.status = DataStatus.SUCCEEDED;
          state.assignmentSubmissionMaterialsPagination = { ...action.payload };
        }
      )
      .addCase(
        fetchAssignmentSubmissionMaterialsAsync.rejected,
        (state, action) => {
          state.status = DataStatus.FAILED;
          state.error =
            action.error.message ||
            "Failed to fetch assignment submission materials list";
        }
      )

      .addCase(fetchAllAssignmentSubmissionMaterialsAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(
        fetchAllAssignmentSubmissionMaterialsAsync.fulfilled,
        (state, action) => {
          state.status = DataStatus.SUCCEEDED;
          state.assignmentSubmissionMaterialsPagination = { ...action.payload };
        }
      )
      .addCase(
        fetchAllAssignmentSubmissionMaterialsAsync.rejected,
        (state, action) => {
          state.status = DataStatus.FAILED;
          state.error =
            action.error.message ||
            "Failed to fetch assignment submission materials list";
        }
      )

      .addCase(fetchAssignmentSubmissionMaterialAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(
        fetchAssignmentSubmissionMaterialAsync.fulfilled,
        (state, action) => {
          state.status = DataStatus.SUCCEEDED;
          state.currentAssignmentSubmissionMaterial = { ...action.payload };
        }
      )
      .addCase(
        fetchAssignmentSubmissionMaterialAsync.rejected,
        (state, action) => {
          state.status = DataStatus.FAILED;
          state.error =
            action.error.message ||
            "Failed to fetch assignment submission material";
        }
      )

      .addCase(deleteAssignmentSubmissionMaterialAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(deleteAssignmentSubmissionMaterialAsync.fulfilled, (state) => {
        state.status = DataStatus.SUCCEEDED;
      })
      .addCase(
        deleteAssignmentSubmissionMaterialAsync.rejected,
        (state, action) => {
          state.status = DataStatus.FAILED;
          state.error =
            action.error.message ||
            "Failed to delete assignment submission material";
        }
      );
  },
});

export default assignmentSubmissionMaterialSlice.reducer;
export const {
  clearCurrentAssignmentSubmissionMaterial,
  clearAssignmentSubmissionMaterialPagination,
} = assignmentSubmissionMaterialSlice.actions;
