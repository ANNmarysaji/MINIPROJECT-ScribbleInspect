import React from "react";
import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useSelector, useDispatch } from "react-redux";
import {
  handleChange,
  clearFilters,
} from "../features/viewTasks/viewTasksSlice";

const SearchContainer = () => {
  const { isTeacher } = useSelector((store) => store.user);
  const { isLoading, search, searchStatus, searchSubject, sort, sortOptions } =
    useSelector((store) => store.viewTasks);
  const { studentStatusOptions, teacherStatusOptions, subjectOptions } =
    useSelector((store) => store.task);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    if (isLoading) return;
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>Filter tasks</h4>
        <div className="form-center">
          <FormRow
            className="form-center"
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />

          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            options={
              isTeacher
                ? ["all", ...teacherStatusOptions]
                : ["all", ...studentStatusOptions]
            }
          />

          <FormRowSelect
            labelText="subject"
            name="searchSubject"
            value={searchSubject}
            handleChange={handleSearch}
            options={["all", ...subjectOptions]}
          />

          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            options={sortOptions}
          />

          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
