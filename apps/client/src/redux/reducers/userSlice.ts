import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("accessToken"),
    id: localStorage.getItem("userId"),
  },
  reducers: {
    SET_USER: (state, action) => {
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    REMOVE_USER: (state) => {
      state.token = null;
      state.id = null;
    },
  },
});

export const { SET_USER, REMOVE_USER } = userSlice.actions;

export default userSlice.reducer;
