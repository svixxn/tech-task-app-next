"use client";
import React, { useEffect, useState } from "react";
import TaskCard from "@/components/TaskCard";
import { Divider } from "@nextui-org/divider";
import CreateTaskForm from "@/components/CreateTaskForm";
import axios from "axios";
import { useQuery } from "react-query";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { filters, sort } from "../constants/filters_sorts";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";

export default function Home() {
  const [status, setStatus] = useState("all");
  const [sortOption, setSortOption] = useState("1");
  const [search, setSearch] = useState("");
  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery(["tasks", status, sortOption, search], async () => {
    const { data } = await axios.get(
      `/api/tasks?status=${status}&sort=${sortOption}&q=${search}`
    );
    return data;
  });

  if (isError) return <div>Something went wrong...</div>;

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Input
          type="text"
          labelPlacement="outside"
          label="Search"
          className="max-w-[420px]"
          size="md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <CreateTaskForm />
      <Accordion variant="bordered">
        <AccordionItem
          key={1}
          aria-label="Accordion 1"
          title="Filter and sort tasks"
        >
          <div className="flex flex-row gap-20">
            <RadioGroup
              label="Filter tasks"
              orientation="horizontal"
              defaultValue={status}
              onValueChange={(value) => setStatus(value)}
            >
              {filters.map((filter) => (
                <Radio key={filter.value} value={filter.value}>
                  {filter.label}
                </Radio>
              ))}
            </RadioGroup>
            <RadioGroup
              label="Sort tasks (by priority)"
              orientation="horizontal"
              defaultValue={sortOption}
              onValueChange={(value) => setSortOption(value)}
            >
              {sort.map((sortOption) => (
                <Radio key={sortOption.value} value={sortOption.value}>
                  {sortOption.label}
                </Radio>
              ))}
            </RadioGroup>
          </div>
        </AccordionItem>
      </Accordion>
      {isLoading ? (
        <Spinner />
      ) : (
        <ul className="mt-10">
          {tasks?.map((task: Task) => (
            <div key={task.id}>
              <TaskCard
                id={task.id}
                completed={task.completed}
                title={task.title}
                priority={task.priority}
                createdAt={task.createdAt}
                updatedAt={task.updatedAt}
              />
              <Divider className="my-4" />
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
