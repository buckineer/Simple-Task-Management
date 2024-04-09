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


export const Textarea = ({name, label, className, icon, ...props}) => {

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
        <textarea
          className={`w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 p-3 text-dark-6 outline-none transition disabled:cursor-default disabled:bg-gray-2
           ${icon ? "pl-12" : "pl-5"} ${
            fieldError
              ? "border-danger text-danger focus:border-danger"
              : "border-[#E0E0E0] text-black focus:border-primary"
          }`}
          id={id}
          {...props}
          {...(register && register(name))}
        />          
        {icon && (
          <span className="absolute top-[18px] left-4">
            {icon}
          </span>
        )}
      </div>
      <InputError fieldError={fieldError}/>
    </div>
  );
};


export default Textarea