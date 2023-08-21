import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("accessToken"),
    id: localStorage.getItem("userId"),
  },
  reducers: {
    SET_USER: (state, action) => {
      state.token = action.payload;
      state.id = action.payload;
    },
    REMOVE_USER: (state) => {
      state.token = null;
    },
  },
});

export const { SET_USER, REMOVE_USER } = userSlice.actions;

export default userSlice.reducer;
