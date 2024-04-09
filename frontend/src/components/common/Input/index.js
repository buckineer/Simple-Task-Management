import React from "react";
import {useFormContext} from "react-hook-form";

export const InputError = ({fieldError}) => {
  if (!fieldError) return null;
  return (
    <p className="mt-2 text-sm text-danger">
      {typeof fieldError === "string"
        ? fieldError
        : fieldError.message
          ? (fieldError.type === "required" ? "This is a required field" : fieldError.message)
          : fieldError.types && Object.values(fieldError.types)[0]}
    </p>
  );
};


export const Input = ({name, label, className, icon, ...props}) => {

  const formContext = useFormContext()
  const register = formContext && formContext.register
  const errors = formContext && formContext.formState.errors
  const id = props.id || `input-id-${name}`;
  const fieldError = errors && errors[name];

  return (
    <div className={className || "mb-[30px]"}>
      <label
        htmlFor={id}
        className="mb-[10px] block text-base font-medium text-black"
      >
        {label}
      </label>
      <div className="relative">
        <input
          className={`h-[46px] w-full rounded-md border pr-5 text-base outline-none ${icon ? "pl-12" : "pl-5"} ${
            fieldError
              ? "border-danger text-danger focus:border-danger"
              : "border-[#E0E0E0] text-black focus:border-primary"
          }`}
          id={id}
          {...props}
          {...(register && register(name))}
        />
        {icon && (
          <span className="absolute left-[18px] top-1/2 -translate-y-1/2">
            {icon}
          </span>
        )}
      </div>
      <InputError fieldError={fieldError}/>
    </div>
  );
};
