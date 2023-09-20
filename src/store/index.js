import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import cartSlice from "./cartSlice"
import projectSlice from "./projectSlice"

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    project: projectSlice.reducer,
  },
})

export default store
