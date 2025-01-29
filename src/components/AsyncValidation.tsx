import { DevTool } from "@hookform/devtools";
import React from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
};
const AsyncValidation = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
    },
    //Validation Modes
    mode: "onSubmit",
    //mode: "onBlur", // default mode is onBlur
  });
  const { register, control, handleSubmit, formState } = form;

  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Async Validation Example</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "This field is required",
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different email address"
                  );
                },
                notBlacklisted: (fieldValue) => {
                  return (
                    ["blacklisted@example.com", "bl@clisted.com"].includes(
                      fieldValue
                    ) || "This email is not allowed"
                  );
                },
                emailAvailable: async (fieldValue) => {
                  //fetch Request to API endpoint asynchronously
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                  );
                  const data = await response.json();
                  return data.length === 0 || "Email already available";
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
          <button>Submit</button>

          {/*Manually Triger Validation */}
          <button type="button" onClick={() => form.trigger("email")}>
            Validate
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default AsyncValidation;
