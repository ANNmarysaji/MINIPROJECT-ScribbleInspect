import React from "react";
import { FaBookOpen, FaCalendarCheck } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Task";
import TaskInfo from "./TaskInfo";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../features/task/taskSlice";
import { setEditingMode } from "../features/task/taskSlice";

const Task = ({
  id,
  taskName,
  teacherName,
  subjectName,
  maxMarks,
  endDate,
  endTime,
  task,
  answerKey = null,
}) => {
  const dispatch = useDispatch();
  const { isTeacher } = useSelector((store) => store.user);

  let iconLetters = "";
  subjectName.split(" ").forEach((word) => {
    if (word.length > 0 && word.charAt(0) === word.charAt(0).toUpperCase())
      iconLetters += word.charAt(0);
  });

  const formatDateTime = (date, time) => {
    const datetime = new Date(`${date} ${time}`);
    const formattedDate = datetime.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const formattedTime = datetime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return `${formattedDate} ${formattedTime}`;
  };

  const handleDelete = () => {
    const result = window.confirm("Are you sure you want to delete this task?");
    result && dispatch(deleteTask(id));
  };

  const openFile = (fileLink) => {
    window.open(fileLink, "_blank");
  };

  const handleEdit = (e) => {
    console.log("handleEdit triggered, ", id);
    dispatch(
      setEditingMode({
        id,
        taskName,
        teacherName,
        subjectName,
        maxMarks,
        endDate,
        endTime,
        task,
        answerKey,
      })
    );
  };

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{iconLetters.substring(0, 4)}</div>
        <div className="info">
          <h5>{taskName}</h5>
          {isTeacher || <p>{teacherName}</p>}
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <TaskInfo icon={<FaBookOpen />} text={subjectName} />
          <TaskInfo
            icon={<FaCalendarCheck />}
            text={formatDateTime(endDate, endTime)}
          />
          <TaskInfo
            icon={<IoShieldCheckmarkSharp />}
            text={`${maxMarks} marks`}
          />
          <div className={`status pending`}>pending</div>
        </div>

        <footer>
          <div className="actions">
            <button
              name="task"
              type="button"
              className="btn edit-btn"
              onClick={() => openFile(task)}
            >
              Task
            </button>

            {isTeacher && (
              <button
                name="key"
                type="button"
                className="btn edit-btn"
                onClick={() => openFile(answerKey)}
              >
                Key
              </button>
            )}

            {!isTeacher && (
              <button
                type="button"
                className="btn edit-btn"
                onClick={() => console.log("Upload Button clicked")}
              >
                Upload
              </button>
            )}

            {isTeacher && (
              <Link
                to="/add-task"
                className="btn edit-btn"
                onClick={handleEdit}
              >
                Edit
              </Link>
            )}

            {!isTeacher && (
              <button
                type="button"
                className="btn delete-btn"
                onClick={() => console.log("Delete submission")}
              >
                Delete
              </button>
            )}

            {isTeacher && (
              <button
                type="button"
                className="btn delete-btn"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Task;
