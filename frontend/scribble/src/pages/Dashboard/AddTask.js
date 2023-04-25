import React, { useEffect, useState } from "react";
import { FormRow, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  createTask,
  uploadFile,
  editTask,
} from "../../features/task/taskSlice";
import { getObjectFromLocalStorage } from "../../utils/localStorage";

const initialState = {
  taskName: "",
  teacherName: getObjectFromLocalStorage("user")?.name,
  subjectName: "",
  endDate: "",
  endTime: "",
  maxMarks: "",
  task: null,
  answerKey: null,
};

const AddTask = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, isEditing, editTaskId, task, subjectOptions } =
    useSelector((store) => store.task);
  const taskRef = React.createRef();
  const answerKeyRef = React.createRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditing) {
      setValues(task);
    }
  }, [dispatch, editTaskId, isEditing, task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    if (
      !values.taskName ||
      !values.subjectName ||
      !values.endDate ||
      !values.endTime ||
      !values.maxMarks
    ) {
      toast.error("please fill out all the fields");
      return;
    }
    if (!values.task || !values.answerKey) {
      toast.error("please upload all the files");
      return;
    }
    isEditing ? dispatch(editTask(values)) : dispatch(createTask(values));
    handleClear();
  };

  const handleClear = () => {
    setValues(initialState);
    taskRef.current.value = null;
    answerKeyRef.current.value = null;
  };

  const handleTaskInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}:${value}`);
    setValues({ ...values, [name]: value });
  };

  const handleFileInput = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    dispatch(
      uploadFile({
        file,
        callback: (fileLink) => {
          console.log("file link in add task ", fileLink);
          setValues({ ...values, [name]: fileLink });
        },
      })
    );
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit task" : "add task"}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="taskName"
            labeltext="task name"
            value={values.taskName}
            handleChange={handleTaskInput}
          />

          <FormRowSelect
            type="text"
            name="subjectName"
            labeltext="subject name"
            options={subjectOptions}
            value={values.subjectName}
            handleChange={handleTaskInput}
          />

          <FormRow
            type="number"
            name="maxMarks"
            value={values.maxMarks}
            labeltext="maximum marks"
            handleChange={handleTaskInput}
          />

          <FormRow
            type="file"
            name="task"
            handleChange={handleFileInput}
            disabled={isLoading}
            ref={taskRef}
          />

          <FormRow
            type="date"
            name="endDate"
            labeltext="end date"
            value={values.endDate}
            handleChange={handleTaskInput}
          />

          <FormRow
            type="time"
            name="endTime"
            labeltext="end time"
            value={values.endTime}
            handleChange={handleTaskInput}
          />

          <FormRow
            type="file"
            name="answerKey"
            labeltext="answer key"
            handleChange={handleFileInput}
            disabled={isLoading}
            ref={answerKeyRef}
          />

          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={handleClear}
            >
              Clear
            </button>

            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isEditing ? "Edit" : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddTask;
