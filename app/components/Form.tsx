"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

type Inputs = {
  title: string;
  description: string;
};

interface CreateTodo {
  title: string;
  description: string;
}

const Form = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const createTodo = async ({ title, description }: CreateTodo) => {
    await axios
      .post("/api/todos/create", {
        title,
        description,
      })
      .then((res) => {
        toast.success("Todo created successfully");
        router.push("/home");
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
        reset();
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);
    createTodo({
      title: data.title,
      description: data.description,
    });
  };
  return (
    <form
      className=" px-20 py-10 flex justify-center items-center w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex gap-4 flex-col justify-center items-center">
        <div className="relative">
          <input
            type="text"
            {...register("title", { required: "This field is required" })}
            placeholder="Title"
            className={`border-2 border-gray-900 rounded-lg h-fit text-lg p-3 bg-transparent ${
              errors.title
                ? "placeholder:text-red-500"
                : "placeholder:text-green-600"
            } text-green-500`}
          />
          {errors.title && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 absolute top-1/3 right-3 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          )}
        </div>
        <div className="relative">
          <textarea
            {...register("description", { required: "This field is required" })}
            rows={3}
            placeholder="Description"
            className={`border-2 border-gray-900 rounded-lg h-fit text-lg p-3 bg-transparent ${
              errors.title
                ? "placeholder:text-red-500"
                : "placeholder:text-green-600"
            } text-green-500`}
          />
          {errors.description && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 absolute top-1/3 right-3 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          )}
        </div>
        <button
          type="submit"
          className="bg-green-600 text-gray-900 rounded-lg font-semibold h-fit px-4 py-2 mt-2"
        >
          Add Todo
        </button>
      </div>
    </form>
  );
};

export default Form;
