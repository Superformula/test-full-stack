import React, { useState, useEffect } from "react";

import "./Input.css";

const Input = (props) => {
  const [value, setValue] = useState(props.value ? props.value : "");

  useEffect(() => {
    const updateValue = (val) => {
      if (val === "clear") {
        setValue("");
      } else if (val) {
        setValue(val);
      }
    };

    updateValue(props.value);
    return () => {
      updateValue(props.value);
    };
  }, [props.value]);

  const onChange = (event) => {
    const value = event.target.value;
    setValue(value);
    if (props.onChange) {
      props.onChange(value);
    }
  };

  const id = props.id ? props.id : props.label;
  const classToUse = props.placeholder ? "input-placeholder" : "input-value";
  return (
    <div>
      {props.label && props.label !== "" ? (
        <label htmlFor={id} className="input-label">
          {props.label}
        </label>
      ) : null}
      <div className={"input " + props.className}>
        <input
          className={classToUse}
          id={id}
          placeholder={props.placeholder ? props.placeholder : null}
          value={value}
          onChange={onChange}
          type="text"
        />
      </div>
    </div>
  );
};

export default Input;
