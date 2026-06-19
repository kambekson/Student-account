import StudyMaterialAPI from "@/Transport/api/StudyMaterial";
import {
  StudyMaterial,
  StudyMaterialFilter,
} from "@/Common/Entity/Base/StudyMaterial";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Pagination } from "@/Common/Entity/Pagination";
import { DataStatus } from "..";

export const fetchStudyMaterialsAsync = createAsyncThunk(
  "studyMaterials/fetchMany",
  async (filter: StudyMaterialFilter) => {
    return await StudyMaterialAPI.fetchStudyMaterials(filter);
  }
);

export const fetchAllStudyMaterialsAsync = createAsyncThunk(
  "studyMaterials/fetchAll",
  async (filter: StudyMaterialFilter) => {
    filter = {
      ...filter,
      page: 1,
      pageSize: 100,
    };

    const firstPage = await StudyMaterialAPI.fetchStudyMaterials(filter);

    const requests: Promise<Pagination<StudyMaterial>>[] = [];
    for (let page = 1; page <= firstPage.metadata.totalPages; page++) {
      requests.push(StudyMaterialAPI.fetchStudyMaterials({ ...filter, page }));
    }

    const responses = await Promise.all(requests);
    const items = responses.flatMap((response) => response.items);

    return {
      metadata: { page: 1, totalPages: 1, totalItems: items.length },
      items,
    } as Pagination<StudyMaterial>;
  }
);

interface StudyMaterialState {
  currentStudyMaterial: StudyMaterial | null;
  studyMaterialsPagination: Pagination<StudyMaterial> | null;
  status: DataStatus;
  error: string | null;
}

const studyMaterialsSlice = createSlice({
  name: "studyMaterials",
  initialState: {
    currentStudyMaterial: null,
    studyMaterialsPagination: null,
    status: DataStatus.IDLE,
    error: null,
  } as StudyMaterialState,
  reducers: {
    clearStudyMaterialPagination(state) {
      state.studyMaterialsPagination = null;
    },
    clearCurrentStudyMaterial(state) {
      state.currentStudyMaterial = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudyMaterialsAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(fetchStudyMaterialsAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.studyMaterialsPagination = { ...action.payload };
      })
      .addCase(fetchStudyMaterialsAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to fetch study materials";
      })

      .addCase(fetchAllStudyMaterialsAsync.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(fetchAllStudyMaterialsAsync.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCEEDED;
        state.studyMaterialsPagination = { ...action.payload };
      })
      .addCase(fetchAllStudyMaterialsAsync.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.error.message || "Failed to fetch study materials";
      });
  },
});

export default studyMaterialsSlice.reducer;
export const { clearStudyMaterialPagination, clearCurrentStudyMaterial } =
  studyMaterialsSlice.actions;
