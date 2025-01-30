import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

// Define a Validation Schema using Zod's object method with comments
// const schema = z.object({
//   username: z.string().nonempty("Username is required"),
//   email: z
//     .string()
//     .nonempty("Email is required")
//     .email("Email format is not valid"),
//   channel: z.string().nonempty("Channel is required"),
// });

// Define a schema using Zod for validating an object with specific fields
const schema = z.object({
  // Define a "username" field that must be a non-empty string
  // If the username is empty, the error message "Username is required" will be returned
  username: z.string().nonempty("Username is required"),

  // Define an "email" field that must be a non-empty string and a valid email format
  // If the email is empty, the error message "Email is required" will be returned
  // If the email format is invalid, the error message "Email format is not valid" will be returned
  email: z
    .string()
    .nonempty("Email is required")
    .email("Email format is not valid"),

  // Define a "channel" field that must be a non-empty string
  // If the channel is empty, the error message "Channel is required" will be returned
  channel: z.string().nonempty("Channel is required"),
});

export const ZodYouTubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Zod YouTube Form</h1>

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
    </div>
  );
};
