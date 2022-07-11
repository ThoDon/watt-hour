import React from "react";

type FormControlPropsType = {
  label: string;
  children: JSX.Element;
};

export function FormControl(props: FormControlPropsType): JSX.Element {
  const { label, children } = props;

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <label className="input-group">{children}</label>
    </div>
  );
}
