import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: null,
  },
  reducers: {
    SET_USER: (state, action) => {
      state.value = action.payload;
    },
    REMOVE_USER: (state) => {
      state.value = null;
    },
  },
});

export const { SET_USER, REMOVE_USER } = userSlice.actions;

export default userSlice.reducer;
