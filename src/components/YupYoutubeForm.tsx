import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

//Yup Validation Schema
// const schema = yup.object({
//   username: yup.string().required("Username is required"),
//   email: yup
//     .string()
//     .email("Email format is not valid")
//     .required("Email is required"),
//   channel: yup.string().required("Channel is required"),
// });

// Define a Validation Schema using Yup's object method with comments
const schema = yup.object({
  // Define a validation rule for the 'username' field
  username: yup
    .string() // Ensure the username is a string
    .required("Username is required"), // Make the username field mandatory and provide an error message if it's missing

  // Define a validation rule for the 'email' field
  email: yup
    .string() // Ensure the email is a string
    .email("Email format is not valid") // Validate that the email follows a valid format and provide an error message if it doesn't
    .required("Email is required"), // Make the email field mandatory and provide an error message if it's missing

  // Define a validation rule for the 'channel' field
  channel: yup
    .string() // Ensure the channel is a string
    .required("Channel is required"), // Make the channel field mandatory and provide an error message if it's missing
});

export const YupYouTubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Yup YouTube Form</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" {...register("username")} />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" {...register("email")} />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" {...register("channel")} />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
