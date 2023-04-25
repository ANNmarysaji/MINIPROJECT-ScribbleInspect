import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import taskSlice from "./features/task/taskSlice";
import viewTasksSlice from "./features/viewTasks/viewTasksSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    task: taskSlice,
    viewTasks: viewTasksSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "task/uploadFile/fulfilled",
          "task/createTask/fulfilled",
          "task/editTask/fulfilled",
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
});
