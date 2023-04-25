import React from "react";

const FormRow = React.forwardRef(
  ({ type, name, value, handleChange, labeltext, disabled = false }, ref) => {
    return (
      <div className="form-row">
        <label htmlFor={name} className="form-label">
          {labeltext || name}
        </label>
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          className="form-input"
          disabled={disabled}
          ref={ref}
        />
      </div>
    );
  }
);

export default FormRow;
