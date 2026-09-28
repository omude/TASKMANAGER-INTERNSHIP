import { useState } from "react";
import logo from "../assets/Group 1.svg";
import profile from "../assets/Group 6 (1).svg";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import type { Task } from "../types/task";
import { Link } from "react-router-dom";

const EditTask = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let task = location.state?.task;
  if (!task) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold text-gray-800">Task not found</h2>

        <button
          onClick={() => navigate("/mytask")}
          className="mt-4 rounded-lg bg-[#974FD0] px-5 py-2 text-white"
        >
          Back to My Tasks
        </button>
      </div>
    );
  }
  let [category, setCategory] = useState(task?.category || "Work");
  let [showCategory, setShowCategory] = useState(false);
  let [title, setTitle] = useState(task?.title || "");
  let [dueDate, setDueDate] = useState(task?.dueDate || "");
  let [description, setDescription] = useState(task?.description || "");
  let [error, setError] = useState("");
  let handleDone = () => {
    if (!title || !description || !category || !dueDate) {
      setError("Please fill in all fields.");
      return;
    }

    let today = new Date().toISOString().split("T")[0];

    if (dueDate < today) {
      setError("Due date cannot be in the past.");
      return;
    }

    setError("");
    let updatedTask: Task = {
      ...task,
      title,
      description,
      category,
      dueDate,
    };

    let savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      let tasks: Task[] = JSON.parse(savedTasks);

      let updatedTasks = tasks.map((item) =>
        item.id === updatedTask.id ? updatedTask : item,
      );

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    navigate("/mytask");
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
          <Link to="/mytask">All Tasks</Link>
          <img src={profile} alt="profile" className="w-[50px]" />
        </div>
      </nav>
      <main className="mx-auto max-w-6xl px-8 py-12">
        <div className="flex items-center gap-2">
          <IoIosArrowBack
            onClick={() => navigate(-1)}
            className="text-[50px] font-medium text-[#292929]"
          />
          <p className="text-[50px] font-medium text-[#292929] font-[Signika Negative]">
            Edit task
          </p>
        </div>
        <div className="space-y-7">
          <div>
            <label className="mb-2 block text-sm text-[#9C9C9C]">
              Task Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-[#B8B6B6] bg-transparent px-5 py-4 outline-none focus:border-[#974FD0]"
            />
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-[#9C9C9C]">Description</label>
            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-none rounded-lg border border-[#B8B6B6] bg-transparent px-5 py-4 outline-none focus:border-[#974FD0]"
            ></textarea>
          </div>
          <div className="relative">
            <label className="mb-2 block text-sm text-gray-500">Category</label>

            {/* Selected category */}
            <button
              type="button"
              onClick={() => setShowCategory(!showCategory)}
              className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-transparent px-5 py-4 text-left outline-none focus:border-[#974FD0]"
            >
              <span>{category}</span>

              <span className="text-gray-500">{showCategory ? "⌃" : "⌄"}</span>
            </button>

            {/* Dropdown options */}
            {showCategory && (
              <div className="absolute left-0 top-full z-10 mt-2 w-full rounded-lg border border-gray-300 bg-white shadow-md">
                <button
                  type="button"
                  onClick={() => {
                    setCategory("Work");
                    setShowCategory(false);
                  }}
                  className="block w-full px-5 py-3 text-left hover:bg-[#974FD0]"
                >
                  Work
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCategory("Personal");
                    setShowCategory(false);
                  }}
                  className="block w-full px-5 py-3 text-left hover:bg-[#974FD0]"
                >
                  Personal
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCategory("Urgent");
                    setShowCategory(false);
                  }}
                  className="block w-full px-5 py-3 text-left hover:bg-[#974FD0]"
                >
                  Urgent
                </button>
              </div>
            )}
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-sm text-gray-500">Due Date</label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-4 outline-none focus:border-[#974FD0]"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            onClick={handleDone}
            className="w-full mt-4 rounded-lg bg-[#974FD0] py-4 text-lg font-medium text-white hover:bg-purple-700"
          >
            Done
          </button>

          <div className="text-center mt-4">
            <a href="#top" className="text-sm text-[#974FD0] underline">
              Back To Top
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditTask;
