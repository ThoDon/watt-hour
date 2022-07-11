import React from "react";

type FormInputPropsType = {
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  name?: string;
  id?: string;
  className?: string;
  max?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  min?: string;
  step?: string;
  addonText?: string;
};

export function FormInput(props: FormInputPropsType): JSX.Element {
  const {
    value,
    onChange,
    onKeyDown,
    placeholder,
    type,
    name,
    id,
    max,
    disabled,
    required,
    readOnly,
    min,
    step,
    addonText,
  } = props;
  return (
    <>
      <input
        className="input input-bordered w-full"
        onKeyDown={onKeyDown}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        type={type}
        name={name}
        id={id}
        max={max}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        min={min}
        step={step}
      />
      {addonText && <span className="whitespace-nowrap">{addonText}</span>}
    </>
  );
}
