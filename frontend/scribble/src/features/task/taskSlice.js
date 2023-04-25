import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { customFetch } from "../../utils/axios";
import { getObjectFromLocalStorage } from "../../utils/localStorage";
import { logoutUser } from "../user/userSlice";
import {
  showLoading,
  hideLoading,
  getTeacherTasks,
} from "../viewTasks/viewTasksSlice";

const initialState = {
  isLoading: false,
  task: null,
  subjectOptions: [
    "Advanced Topics in Machine Learning",
    "Algorithm Analysis and Design",
    "Compiler Design",
    "Comprehensive Course Work",
    "Computer Graphics and Image Processing",
    "Foundations of Machine Learning",
    "Foundation of Security and Computing",
    "Mini Project",
    "Networking Lab",
    "Programming in Python",
  ],
  studentStatusOptions: [
    "pending",
    "submitted",
    "missed",
    "graded",
    "requested",
    "reviewed",
  ],
  teacherStatusOptions: ["ongoing", "completed", "grading", "graded"],
  isEditing: false,
  editTaskId: "",
};

export const uploadFile = createAsyncThunk(
  "task/uploadFile",
  async (filedata, thunkAPI) => {
    try {
      const { file, callback } = filedata;
      const formData = new FormData();
      formData.append("pdf", file);
      const token = getObjectFromLocalStorage("token");

      const axiosConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token.access}`,
        },
      };

      const resp = await customFetch.post(
        "/pdfs/files/",
        formData,
        axiosConfig
      );

      return { data: resp.data, callback: callback };
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(
          logoutUser({ type: "error", message: "Session expired..." })
        );
        return;
      }
      return thunkAPI.rejectWithValue(error.response.data.detail);
    }
  }
);

export const createTask = createAsyncThunk(
  "task/createTask",
  async (task, thunkAPI) => {
    try {
      const token = getObjectFromLocalStorage("token");
      const resp = await customFetch.post(
        "/tasks/addtask",
        {
          name: task.taskName,
          subject: task.subjectName,
          teacher: task.teacherName,
          max_marks: task.maxMarks,
          end_date: task.endDate,
          end_time: task.endTime,
          task_pdf_link: task.task,
          answer_key_link: task.answerKey,
        },
        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );
      return resp;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(
          logoutUser({ type: "error", message: "Session expired..." })
        );
        return;
      }
      return thunkAPI.rejectWithValue(
        Object.values(error.response.data).shift().shift()
      );
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
      const token = getObjectFromLocalStorage("token");
      const resp = await customFetch.delete("/tasks/delete/" + taskId, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      });

      thunkAPI.dispatch(getTeacherTasks());
      console.log(resp);
      return resp.status;
    } catch (error) {
      thunkAPI.dispatch(hideLoading());
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const editTask = createAsyncThunk(
  "task/editTask",
  async (task, thunkAPI) => {
    try {
      console.log(task.id);
      const token = getObjectFromLocalStorage("token");
      const resp = await customFetch.put(
        "/tasks/edit/" + task.id,
        {
          name: task.taskName,
          subject: task.subjectName,
          teacher: task.teacherName,
          max_marks: task.maxMarks,
          end_date: task.endDate,
          end_time: task.endTime,
          task_pdf_link: task.task,
          answer_key_link: task.answerKey,
        },
        {
          headers: { Authorization: `Bearer ${token.access}` },
        }
      );

      console.log(resp);
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,

  reducers: {
    setEditingMode: (state, { payload }) => {
      state.isEditing = true;
      state.editTaskId = payload.id;
      state.task = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.isLoading = true;
        state.fileLink = null;
      })
      .addCase(uploadFile.fulfilled, (state, { payload }) => {
        const { data, callback } = payload;
        const fileLink = data.pdf;
        state.isLoading = false;
        callback(fileLink);
      })
      .addCase(uploadFile.rejected, (state, { payload }) => {
        state.isLoading = false;
        payload && toast.error(payload);
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("Created a new task");
      })
      .addCase(createTask.rejected, (state, { payload }) => {
        state.isLoading = false;
        payload && toast.error(payload);
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success(payload || "Deleted task");
      })
      .addCase(deleteTask.rejected, (state, { payload }) => {
        state.isLoading = false;
        payload && toast.error(payload);
      })
      .addCase(editTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isEditing = false;
        state.editTaskId = "";
        if (payload.status === 200) toast.success("Edited task");
      })
      .addCase(editTask.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isEditing = false;
        state.editTaskId = "";
        payload && toast.error(payload);
      });
  },
});

export default taskSlice.reducer;
export const { setEditingMode } = taskSlice.actions;
