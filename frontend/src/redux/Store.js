import { configureStore } from "@reduxjs/toolkit";
import AdminTimingSlice from "./slice/AdminTimingSlice";
import UsersSlice from "./slice/UsersSlice";

export const store = configureStore({
  reducer: {
    adminTiming: AdminTimingSlice,
    users: UsersSlice,
  },
});
