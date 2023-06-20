"use client";
import { useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
import { useState } from "react";
import { SemanticClassificationFormat } from "typescript";
import dynamic from "next/dynamic";

const DevTool: React.ElementType = dynamic(
  () => import("@hookform/devtools").then(module => module.DevTool),
  { ssr: false }
);

type FormValues = {
  username: string;
  email: string;
  channel: string;
  phoneNumbers: string[];
};

export const YouTubeForm: any = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: async () => {
      //() means we don't have logic in function only return
      //what we return is object which is ({})
      const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const data = await response.json();
      return {
        username: data.username,
        email: data.email,
        channel: "",
        phoneNumbers: ["", ""],
      };
    },
  });
  console.log(errors);
  // const [userName, setuserName] = useState("");
  const { name, ref, onChange, onBlur } = register("username");
  let renderCount = 0;
  renderCount++;

  const onSubmit = (data: FormValues) => {
    console.log("form submitted", data);
  };
  return (
    <section>
      <h1>YouTube Form {renderCount}</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: { value: true, message: "Username is required" },
          })}
          //  onChange={e => setuserName(e.target.value)}
        />
        <p className="error">{errors.username?.message}</p>
        {/* {input({ type: "text", {...register("username")} })}     */}

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email format",
            },
          })}
        />
        <p className="error">{errors.email?.message}</p>

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel", {
            required: { value: true, message: "Channel name is required" },
          })}
        />
        <p className="error">{errors.channel?.message}</p>

        <label htmlFor="primaryNumber">Primary Number</label>
        <input
          type="text"
          id="primaryNumber"
          {...register("phoneNumbers.0", {
            required: { value: true, message: "Primary number is required" },
          })}
        />
        <p className="error">{errors?.phoneNumbers?.[0]?.message}</p>

        <label htmlFor="secondaryNumber">Secondary Number</label>
        <input
          type="text"
          id="secondaryNumber"
          {...register("phoneNumbers.1", {
            required: { value: true, message: "Secondary number is required" },
          })}
        />
        <p className="error">{errors?.phoneNumbers?.[0]?.message}</p>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </section>
  );
};
