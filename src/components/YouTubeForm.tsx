import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  //Nested Object Example
  social: {
    twitter: string;
    facebook: string;
  };
  //Array Example
  phoneNumbers: string[];
  //Dynamic Field
  phNumbers: { number: string }[];
  //Numeric & Date Example
  age: number;
  dob: Date;
};

export const YouTubeForm = () => {
  //useForm hook returns form object
  //setting defaultVaulues in useForm hook
  const form = useForm<FormValues>({
    defaultValues: {
      username: "Batman",
      email: "",
      channel: "",
      //Nested Object Example
      social: {
        twitter: "",
        facebook: "",
      },
      //Array Example
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
      //Numeric & Date Example
      age: 0,
      dob: new Date(),
    },
  });

  {
    /* To load Previously saved values from an API Endpoint:
      const form = useForm({
      defaultValues: async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const data = response.json();
      return {
        username: "Batman",
        email: data.email,
        channel: "",
      };
      }})
    */
  }

  //form object
  const { register, control, handleSubmit, formState, watch } = form;
  // destructure form fields with their respective refs, onChange and onBlur handlers
  //const { name, ref, onChange, onBlur } = register("username");
  //const { email, ref, onChange, onBlur } = register("email");
  const { errors } = formState;

  //Dynamic Field Example
  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  renderCount++;

  //match the FormValues to the values being submitted
  const onSubmit = (data: FormValues) => {
    console.log("form submitted", data);
  };

  //Watch Field Value Example
  const watchUserName = watch("username"); // watch the user name field
  const watches = watch(["username", "email", "channel", "age"]); //Array of fields to watch
  const watching = watch(); //watch all fields

  return (
    <div style={{ marginLeft: "150px" }}>
      <h1>YouTube Form ({renderCount / 2})</h1>

      {/*Watch Field Value Example */}
      <h3>Watch Field Value: {watchUserName}</h3>
      <h4>Watch Field Value: {watches}</h4>
      <h3>Watch Field Value: {JSON.stringify(watching)}</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          {/* <input
          type="text"
          id="username"
          name={name}
          ref={ref}
          onChange={onchange}
          onBlur={onblur}
        /> */}
          {/*spread the register method on the form control */}
          <input
            type="text"
            id="username"
            {...register("username", { required: "Username is required" })}
          />
          <p className="error">{errors.username?.message} </p>
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          {/* <input
          type="email"
          id="email"
          name={email}
          ref={ref}
          onChange={onchange}
          onBlur={onblur}
        /> */}
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
          />

          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", { required: "Channel Name is required" })}
          />
          {/* <input
          type="text"
          id="channel"
          {...register("channel", {
            required: {
              value: true,
              message: "Channel Name is required",
            },
          })}
        /> */}
          <p className="error">{errors.channel?.message}</p>
        </div>

        {/*Custom Validation Example */}
        <div className="form-control">
          <label htmlFor="cutomValidation">Custom Validation</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
              validate: (fieldValue) => {
                return (
                  fieldValue !== "admin@example.com" ||
                  "Enter a different email address"
                );
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        {/*Nested Object Examples */}
        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", { required: "Link is required" })}
          />
          <p className="error">{errors.social?.twitter?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input
            type="text"
            id="facebok"
            {...register("social.facebook", { required: "Link is required" })}
          />
          <p className="error">{errors.social?.facebook?.message}</p>
        </div>
        {/*Array Examples */}
        <div className="form-control">
          <label htmlFor="primary-phone">Primary Phone Number</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0", {
              required: "Primary Phone Number is required",
            })}
          />
          <p className="error">{errors.phoneNumbers?.[0]?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="secondary-phone">Secondary Phone Number</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1", {
              required: "Secondary Phone Number is required",
            })}
          />
          <p className="error">{errors.phoneNumbers?.[1]?.message}</p>
        </div>

        {/*Dynamic Fields */}
        <div className="form-control">
          <label>List of Phone numbers</label>
          <div>
            {fields.map((fields, index) => {
              return (
                <div className="form-control" key={fields.id}>
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number` as const)}
                  />
                  {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
            <button type="button" onClick={() => append({ number: "" })}>
              Add phone number
            </button>
          </div>
        </div>
        {/*Numeric & Date Example */}
        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "Age is required",
              },
              min: 18,
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: {
                value: true,
                message: "Date of Birth is required",
              },
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
