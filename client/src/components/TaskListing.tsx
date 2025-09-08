/* eslint-disable @typescript-eslint/no-explicit-any */
import { MoreVertical } from "lucide-react";
import { CustomDropdown } from "../re-usable/dropdown";
import type { ITask } from "../interfaces/user";


interface TaskCardProps {
  task:ITask 
  updateTaskMutation: any;
  handleEditClick: (task: ITask) => void;
  handleDeleteTask: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  updateTaskMutation,
  handleEditClick,
  handleDeleteTask,
}) => {
  return (
    <div className="flex flex-col bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all relative">
      <div className="flex justify-between items-start">
        <h2
          className={`text-lg font-semibold ${
            task.status === "completed"
              ? "line-through text-green-600"
              : "text-gray-900"
          }`}
        >
          {task.title}
        </h2>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center">
            <button
              onClick={() =>
                updateTaskMutation.mutate({
                  taskId: task._id,
                  updates: {
                    status:
                      task.status === "pending" ? "completed" : "pending",
                  },
                })
              }
              className={`w-8 h-8 flex items-center justify-center rounded cursor-pointer transition-colors
                ${
                  task.status === "completed"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }
                border-none outline-none
              `}
            >
              ✔
            </button>
          </div>
          <CustomDropdown
            label={<MoreVertical size={18} />}
            items={[{ name: "Edit" }, { name: "Delete" }]}
            disabled={task.status === "completed"}
            onClick={(item) => {
              if (item.name === "Edit") handleEditClick(task);
              if (item.name === "Delete") handleDeleteTask(task._id);
            }}

          />
        </div>
      </div>
      {task.description && (
        <p className="text-gray-600 mt-2">{task.description}</p>
      )}
      <div className="text-sm text-gray-400 mt-2 flex gap-4">
        <p>Created: {new Date(task.createdAt).toLocaleDateString()}</p>
        <p>Updated: {new Date(task.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default TaskCard;
