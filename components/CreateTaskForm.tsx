"use client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";
import { RxCross1 } from "react-icons/rx";

const TaskValidation = z.object({
  title: z.string().min(1),
  priority: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string",
  }),
});

const CreateTaskForm = () => {
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof TaskValidation>>({
    resolver: zodResolver(TaskValidation),
  });

  const { mutate: submit } = useMutation({
    mutationKey: "createTask",
    mutationFn: async (values: z.infer<typeof TaskValidation>) => {
      const { data } = await axios.post("/api/tasks", {
        title: values.title,
        priority: parseInt(values.priority, 10),
      });

      return data;
    },
    onSuccess: () => {
      toast.success("Task created successfully");
      reset();
      setShowForm(false);
      queryClient.invalidateQueries("tasks");
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (values: z.infer<typeof TaskValidation>) => {
    submit(values);
  };

  return (
    <>
      {!showForm ? (
        <Button size="lg" className="w-full" onPress={() => setShowForm(true)}>
          Create Task
        </Button>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row gap-2">
          <Input
            placeholder="Title"
            isInvalid={!!errors.title}
            errorMessage={!!errors.title && errors.title.message}
            {...register("title")}
          />
          <Input
            type="number"
            max={10}
            min={1}
            placeholder="Priority"
            isInvalid={!!errors.priority}
            errorMessage={!!errors.priority && errors.priority.message}
            {...register("priority")}
          />
          <Button type="submit" isLoading={isSubmitting}>
            Submit
          </Button>
          <Button
            type="submit"
            isIconOnly
            color="danger"
            onPress={() => setShowForm(false)}
          >
            <RxCross1 />
          </Button>
        </form>
      )}
    </>
  );
};

export default CreateTaskForm;
