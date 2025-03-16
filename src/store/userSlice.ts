import { createSlice } from "@reduxjs/toolkit";

export interface User {
  name: string;
  email: string;
  role?: string;
}

const initialState: User = {
  name: "",
  email: "",
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => {
      return { name: "", email: "", role: "" };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
