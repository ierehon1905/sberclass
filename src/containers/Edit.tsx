import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store";
import { useForm } from "react-hook-form";

export default () => {
  const { id } = useParams<{ id: string }>();
  const data = useSelector((state: RootState) => state);
  const { handleSubmit, register, errors } = useForm<{
    title: string;
    path: string;
  }>();
  const onSubmit = (values: any) => console.log(values);

  const page = data.flow.find(p => p.id === id);
  //   return (
  //     <div>
  //       <h2>Edit page</h2>
  //       {JSON.stringify(page)}
  //     </div>
  //   );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="title"
        ref={register({
          required: "Required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address",
          },
        })}
      />
      {errors.title && errors.title.message}

      <input
        name="path"
        ref={register({
          validate: value => value !== "admin" || "Nice try!",
        })}
      />
      {errors.path && errors.path.message}

      <button type="submit">Submit</button>
    </form>
  );
};
