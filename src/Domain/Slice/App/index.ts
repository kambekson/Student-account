import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  currentPageId?: string;
}

const appSlice = createSlice({
  name: "app",
  initialState: {} as AppState,
  reducers: {
    setCurrentPageId: (state, action) => {
      state.currentPageId = action.payload;
    },
  },
});

export const { setCurrentPageId } = appSlice.actions;
export default appSlice.reducer;
