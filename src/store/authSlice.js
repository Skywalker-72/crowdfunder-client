import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, id: 0 },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
      state.id = 1;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.id = 0;
    },
  },
})

export const authActions = authSlice.actions
export default authSlice
