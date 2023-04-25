import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { customFetch } from "../../utils/axios";
import { getObjectFromLocalStorage } from "../../utils/localStorage";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchSubject: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  tasks: [],
  totalTasks: 20,
  numOfPages: 8,
  page: 1,
  stats: {},
  ...initialFiltersState,
};

export const getAllTasks = createAsyncThunk(
  "tasks/getTasks",
  async (thunkAPI) => {
    try {
      const token = getObjectFromLocalStorage("token");
      const resp = await customFetch.get("/tasks/alltasks", {
        headers: { Authorization: `Bearer ${token.access}` },
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getTeacherTasks = createAsyncThunk(
  "tasks/getTeacherTasks",
  async (thunkAPI) => {
    try {
      const token = getObjectFromLocalStorage("token");
      const name = getObjectFromLocalStorage("user").name;
      const resp = await customFetch.get("/tasks/alltasks/" + name, {
        headers: { Authorization: `Bearer ${token.access}` },
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.detail.shift().shift()
      );
    }
  }
);

const viewTasksSlice = createSlice({
  name: "viewTasks",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTasks.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.totalTasks = payload.length;
        state.numOfPages = Math.ceil(payload.length / 10);
        state.tasks = payload.map((item) => {
          return {
            id: item.id,
            taskName: item.name,
            subjectName: item.subject,
            teacherName: item.teacher,
            maxMarks: item.max_marks,
            endDate: item.end_date,
            endTime: item.end_time,
            task: item.task_pdf_link,
          };
        });
      })
      .addCase(getAllTasks.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload || "Get task went wrong :)");
      })
      .addCase(getTeacherTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeacherTasks.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // state.totalTasks = payload.length;
        // state.numOfPages = Math.ceil(payload.length / state.tasksPerPage);
        state.tasks = payload.map((item) => {
          return {
            id: item.id,
            taskName: item.name,
            subjectName: item.subject,
            teacherName: item.teacher,
            maxMarks: item.max_marks,
            endDate: item.end_date,
            endTime: item.end_time,
            task: item.task_pdf_link,
            answerKey: item.answer_key_link,
          };
        });
      })
      .addCase(getTeacherTasks.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload || "Get task went wrong :)");
      });
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
} = viewTasksSlice.actions;
export default viewTasksSlice.reducer;
