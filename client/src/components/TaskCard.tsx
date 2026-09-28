import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

import type { Task } from "../types/task";
interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const TaskCard = ({
  task,
  onToggleComplete,
  onDelete,
  onEdit,
}: TaskCardProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex justify-between items-center border-b border-[#B8B6B6] p-3">
        <span className="bg-purple-100 rounded-full px-3 py-1 text-sm font-medium text-purple-600">
          {task.category}
        </span>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => onEdit(task.id)}
            className="text-sm font-medium bg-[#974FD0] px-3 py-1 rounded-lg flex gap-2 text-[#FAF9FB] items-center hover:bg-purple-900 cursor-pointer "
          >
            <FaEdit />
            Edit
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="flex items-center gap-2 text-sm font-medium border border-[#974FD0] text-[#974FD0] rounded-lg px-3 py-1 hover:bg-purple-900 cursor-pointer"
          >
            <RiDeleteBin5Line />
            Delete
          </button>
        </div>
      </div>
      <div>
        <h3
          className={`text-[35px] font-semibold mt-4 ${
            task.completed ? "text-gray-400 line-through" : "text-gray-900"
          }`}
        >
          {task.title}
        </h3>
        <p className="text-[24px]">{task.description}</p>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-gray-500">Due: {task.dueDate}</p>

        <button
          onClick={() => onToggleComplete(task.id)}
          className={`text-sm font-medium ${
            task.completed ? "text-purple-600" : "text-gray-500"
          }`}
        >
          {task.completed ? "✓ Completed" : "□ Pending"}
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
