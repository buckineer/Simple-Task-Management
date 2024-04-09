import React from "react";
import {useFormContext} from "react-hook-form";
import {InputError} from "../Input";

const Select = ({name, className, label, options, ...props}) => {
  const formContext = useFormContext()
  const register = formContext && formContext.register
  const errors = formContext && formContext.formState.errors
  const id = props.id || `input-id-${name}`;
  const fieldError = errors && errors[name];
  return (
    <div className={className || "mb-[30px]"}>
      {label &&
        <label
          htmlFor={id}
          className="mb-[10px] block text-base font-medium text-black"
        >
          {label}
        </label>
      }
      <div className="relative">
        <select
          className={`relative z-20 w-full appearance-none rounded-lg border-[1.5px] border-form-stroke bg-transparent 
                      py-3 px-5 font-medium outline-none transition active:border-primary 
                      disabled:cursor-default disabled:bg-[#F5F7FD] 
            ${fieldError
            ? "border-danger text-danger focus:border-danger"
            : "text-body-color focus:border-primary"}`}
          id={id}
          {...props}
          {...(register && register(name))}
        >
          { options && options.map((item, index)=>(<option key={index} value={item.value}> {item.label} </option>))}
        </select>
        <span className="absolute right-4 top-1/2 z-10 mt-[-2px] h-[10px] w-[10px] -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-body-color"></span>
      </div>
      <InputError fieldError={fieldError}/>
    </div>
  )
}

export default Select