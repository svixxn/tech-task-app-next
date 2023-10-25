"use client";
import { Checkbox } from "@nextui-org/checkbox";
import { Button } from "@nextui-org/button";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

export default function TaskCard({ id, title, completed, priority }: Task) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: completeTask } = useMutation({
    mutationKey: "updateTask",
    mutationFn: async () => {
      const { data } = await axios.post(`/api/tasks/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  const { mutate: deleteTask } = useMutation({
    mutationKey: "deleteTask",
    mutationFn: async () => {
      const { data } = await axios.delete(`/api/tasks/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      toast.success("Task deleted successfully");
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  return (
    <div className="flex flex-row justify-between">
      <Checkbox
        defaultSelected={completed}
        lineThrough
        onValueChange={() => completeTask()}
      >
        {`${title} (priority: ${priority})`}
      </Checkbox>
      <Button isIconOnly color="danger" onPress={() => setIsOpenModal(true)}>
        <AiFillDelete size={16} />
      </Button>
      <DeleteModal
        title={title}
        onDelete={deleteTask}
        isShowModal={isOpenModal}
        setIsShowModal={setIsOpenModal}
      />
    </div>
  );
}
