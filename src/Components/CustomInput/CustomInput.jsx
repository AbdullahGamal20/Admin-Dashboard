import React from "react";
import "./customInput.css";

function CustomInput(props) {
  const { type, label, i_id, i_class, name, val, onCh, onBl } = props;
  return (
    <div>
      <div className="mb-3">
        <input
          type={type}
          className={`form-control ${i_class}`}
          id={i_id}
          placeholder={label}
          name={name}
          value={val}
          onChange={onCh}
          onBlur={onBl}
        />
      </div>
    </div>
  );
}

export default CustomInput;
