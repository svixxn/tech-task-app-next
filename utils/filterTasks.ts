export default function filterTasks(
  tasks: Task[],
  filter: string,
  sort: number
) {
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "done") return task.completed;
    if (filter === "undone") return !task.completed;
    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sort === 1) {
      return a.priority - b.priority;
    } else if (sort === -1) {
      return b.priority - a.priority;
    } else if (sort === 0) {
      return a.createdAt > b.createdAt ? 1 : -1;
    } else {
      return 0;
    }
  });

  return sortedTasks;
}
