import TaskCard from "../components/TaskCard";
import type { Task } from "../types/task";
import logo from "../assets/Group 1.svg";
import profile from "../assets/Group 6 (1).svg";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function MyTasks() {
  const navigate = useNavigate();
  let [search, setSearch] = useState("");
  let [categoryFilter, setCategoryFilter] = useState("All");
  let [statusFilter, setStatusFilter] = useState("All");
  let [tasks, setTasks] = useState<Task[]>(() => {
    let savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  let totalTasks = tasks.length;

  let completedTasks = tasks.filter((task) => task.completed).length;

  let pendingTasks = tasks.filter((task) => !task.completed).length;
  let filteredTasks = tasks.filter((task) => {
    let matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    let matchesCategory =
      categoryFilter === "All" || task.category === categoryFilter;

    let matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Completed" && task.completed) ||
      (statusFilter === "Pending" && !task.completed);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  let toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };
  let deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  let editTask = (id: string) => {
    let taskToEdit = tasks.find((task) => task.id === id);

    navigate("/edittask", {
      state: {
        task: taskToEdit,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="px-[120px] py-[20px] flex justify-between border-b border-[#B8B6B6]">
        <div className="flex justify-between items-center gap-2">
          <img src={logo} alt="" className="w-[50px]" />
          <p className="text-[#2D0050] font-semibold font-[Signika Negative]">
            TaskDuty
          </p>
        </div>
        <div className="flex justify-between gap-7 items-center text-[#292929] font-[Signika Negative] font-medium">
          <Link to="/newtask">New Task</Link>
          <img src={profile} alt="profile" className="w-[50px]" />
        </div>
      </nav>
      <main className="mx-auto max-w-6xl px-8 py-12">
        {/* Heading */}
        <div className="flex items-center justify-between items-center">
          <div>
            <h1 className="text-[50px] font-[Signika Negative] font-medium">
              My Tasks
            </h1>
          </div>

          <Link
            to="/newtask"
            className="text-[#974FD0] text-[24px] font-[Signika Negative] font-medium"
          >
            + Add New Task
          </Link>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-3 gap-5">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total</p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {totalTasks}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Pending</p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {pendingTasks}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Completed</p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {completedTasks}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-8 flex items-center gap-5 rounded-xl border border-gray-200 p-5">
          <div className="flex flex-1 justify-between items-center ">
            <div className="flex items-center gap-4">
              <div>
                <label className="mr-2 text-sm font-medium text-gray-600">
                  Category:
                </label>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-purple-500"
                >
                  <option value="All">All Categories</option>
                  <option>Work</option>
                  <option>Personal</option>
                  <option>Urgent</option>
                </select>
              </div>

              <div>
                <label className="mr-2 text-sm font-medium text-gray-600">
                  Status:
                </label>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-purple-500"
                >
                  <option value="All">All Status</option>
                  <option>Pending</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 p-2 w-full border border-[#B8B6B6] rounded-lg">
                <CiSearch />

                <input
                  type="text"
                  placeholder="Search tasks...."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 outline-none "
                />
              </div>
            </div>
          </div>
        </div>

        {/* Task list */}
        <div className="mt-6 space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={toggleComplete}
                onDelete={deleteTask}
                onEdit={editTask}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              {tasks.length === 0 ? (
                <>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    No tasks yet
                  </h2>

                  <p className="mt-2 max-w-md text-gray-500">
                    You don't have any tasks yet. Create your first task and
                    start organizing your day.
                  </p>

                  <Link
                    to="/newtask"
                    className="mt-6 rounded-lg bg-[#974FD0] px-6 py-3 font-medium text-white hover:bg-purple-900"
                  >
                    + Create Your First Task
                  </Link>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    No tasks found
                  </h2>

                  <p className="mt-2 text-gray-500">
                    We couldn't find any task matching your current search or
                    filters.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MyTasks;
