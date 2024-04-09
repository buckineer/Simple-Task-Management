import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

const Form = ({ onSubmit, schema, defaultFormValues, children }, ref) => {
  const formMethods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    formMethods.reset(defaultFormValues);
  }, [defaultFormValues, formMethods]);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} ref={ref}>
        {children}
      </form>
    </FormProvider>
  );
};


export default React.forwardRef(Form);
