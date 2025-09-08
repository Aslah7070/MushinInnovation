

import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, fetchTasks, updateTask } from "../api-helper/task.helper";
import type { ITask } from "../interfaces/user";
import { Plus } from "lucide-react";

import TaskCard from "../components/TaskListing";

const HomePage = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const tasksPerPage = 5; 

  const queryClient = useQueryClient();

const taskRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleScrollToTask = (id: string) => {
  const el = taskRefs.current[id];
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

  const { data: tasks = [], isLoading } = useQuery<ITask[]>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });


  const addTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setNewTitle("");
      setNewDescription("");
    },
    onError: (error) => {
      console.error("Failed to add task:", error);
    },
  });

  // Delete task
  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onMutate: async (taskId: string) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData<ITask[]>(["tasks"]) || [];
      queryClient.setQueryData<ITask[]>(
        ["tasks"],
        previousTasks.filter((t) => t._id !== taskId)
      );
      return { previousTasks };
    },
    onError: (_err, _taskId, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleDeleteTask = (taskId: string) => {
    deleteTaskMutation.mutate(taskId);
  };

  // Update task
  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, updates }: { taskId: string; updates: Partial<ITask> }) =>
      updateTask(taskId, updates),
    onMutate: async ({ taskId, updates }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData<ITask[]>(["tasks"]) || [];

      queryClient.setQueryData<ITask[]>(
        ["tasks"],
        previousTasks.map((task) =>
          task._id === taskId ? { ...task, ...updates } : task
        )
      );

      return { previousTasks };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setEditingTaskId(null);
      setNewTitle("");
      setNewDescription("");
    },
  });

  const handleAddOrUpdate = () => {
    if (!newTitle.trim()) return;

    if (editingTaskId) {
      updateTaskMutation.mutate({
        taskId: editingTaskId,
        updates: { title: newTitle, description: newDescription },
      });
    } else {
      addTaskMutation.mutate({ title: newTitle, description: newDescription });
    }
  };

  const handleEditClick = (task: ITask) => {
    setEditingTaskId(task._id);
    setNewTitle(task.title);
    setNewDescription(task.description);
  };

  const filteredTasks = tasks.filter(
  (task) =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description.toLowerCase().includes(search.toLowerCase())
);
console.log("filteredTasks",filteredTasks)


  const startIndex = (page - 1) * tasksPerPage;
  const paginatedTasks = tasks.slice(startIndex, startIndex + tasksPerPage);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  

  return (
   <div className="pt-28 px-6 h-screen text-black">
  <h1 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
    Welcome To Your Tasks
  </h1>


  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
  
    <div className="flex flex-col gap-3">
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Enter task title..."
        className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        placeholder="Enter task description..."
        className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        rows={3}
      />
      <button
        onClick={handleAddOrUpdate}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-all"
      >
        <Plus size={18} />
        {editingTaskId ? "Update Task" : "Add Task"}
      </button>
    </div>

 
   <div className="space-y-3 flex flex-col justify-between  h-[400px] overflow-y-auto scrollbar-thin  relative">
<input
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search tasks..."
  className="px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
/>


{search && filteredTasks.length > 0 && (
  <div className="absolute top-12 left-0 right-0 bg-white shadow-lg rounded-xl max-h-60 overflow-y-auto z-10 p-3">
    {filteredTasks.map((task) => (
      <div
        key={task._id}
        className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
        onClick={() => {
          handleScrollToTask(task._id); 
          setSearch(""); 
        }}
      >
        <span className="font-semibold">{task.title}</span>
        <p className="text-sm text-gray-500 truncate">{task.description}</p>
      </div>
    ))}
  </div>
)}
  {isLoading ? (
    <p className="text-gray-500 text-center">Loading tasks...</p>
  ) : !search && paginatedTasks.length === 0 ? (
    <p className="text-gray-500 text-center">No tasks yet. Add one above!</p>
  ) : (
    !search &&
    paginatedTasks.map((task) => (
      <div key={task._id}   ref={(el) => {
    taskRefs.current[task._id] = el; 
  }}>
        <TaskCard
          task={task}
          updateTaskMutation={updateTaskMutation}
          handleEditClick={handleEditClick}
          handleDeleteTask={handleDeleteTask}
        />
      </div>
    ))
  )}



{!search && tasks.length > tasksPerPage && (
    <div className="flex gap-3 mt-6 items-center justify-center bg-white ">
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => setPage((p) => p + 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )}
</div>

  </div>
</div>

  );
};

export default HomePage;
