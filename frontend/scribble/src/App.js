import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Error, Register, PrivateRoute } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Stats,
  Profile,
  ViewTasks,
  AddTask,
  Results,
  SharedLayout,
} from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <SharedLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="view-tasks" element={<ViewTasks />} />
          <Route path="add-task" element={<AddTask />} />
          <Route path="results" element={<Results />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
