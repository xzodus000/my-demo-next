"use client";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import "./styles.css";
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  interests: string[];
}

const FormPage: React.FC = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            style={{ color: "black" }}
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            style={{ color: "black" }}
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            style={{ color: "black" }}
            {...register("email", {
              required: "Email is required",
              pattern: /^\S+@\S+$/i,
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="username">Username:</label>
          <input
            style={{ color: "black" }}
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            style={{ color: "black" }}
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <label>Interests:</label>
          <div>
            <label>
              <input
                type="checkbox"
                {...register("interests", { required: "Select at least one" })}
                value="React"
              />
              React
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                {...register("interests")}
                value="Next.js"
              />
              Next.js
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                {...register("interests")}
                value="Laravel"
              />
              Laravel
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                {...register("interests")}
                value="GraphQL"
              />
              GraphQL
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                {...register("interests")}
                value="Nest.js"
              />
              Nest.js
            </label>
          </div>
          {errors.interests && <p>{errors.interests.message}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormPage;
