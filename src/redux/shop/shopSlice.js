import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
  name: "shop",
  initialState: {
    collections: null,
    isFetching: false,
    errorMessage: undefined,
  },
  reducers: {
    fetchCollectionsStart: (state) => {
      state.isFetching = true;
    },
    fetchCollectionsSuccess: (state, action) => {
      state.isFetching = false;
      state.collections = action.payload;
    },
    fetchCollectionsFailure: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    },
  },
});

export const {
  fetchCollectionsFailure,
  fetchCollectionsStart,
  fetchCollectionsSuccess,
} = shopSlice.actions;

export default shopSlice.reducer;
