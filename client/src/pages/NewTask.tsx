import { useState } from "react";
import logo from "../assets/Group 1.svg";
import profile from "../assets/Group 6 (1).svg";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import type { Task } from "../types/task";
import { Link } from "react-router-dom";
const NewTask = () => {
  const navigate = useNavigate();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [category, setCategory] = useState("Work");
  let [dueDate, setDueDate] = useState("");
  let [error, setError] = useState("");
  let handleSubmit = () => {
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

    let newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      dueDate,
      category: category as Task["category"],
      completed: false,
    };

    let savedTasks = localStorage.getItem("tasks");

    let tasks: Task[] = savedTasks ? JSON.parse(savedTasks) : [];

    tasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    navigate("/mytask");
  };
  return (
    <div>
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
            New Task
          </p>
        </div>
        <div className="space-y-7">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm text-gray-500">
              Task Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-4 outline-none focus:border-[#974FD0]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm text-gray-500">
              Description
            </label>

            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-none rounded-lg border border-gray-300 bg-transparent px-5 py-4 outline-none focus:border-[#974FD0]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm text-gray-500">Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-4 outline-none focus:border-[#974FD0]"
            >
              <option>Work</option>
              <option>Personal</option>
              <option>Urgent</option>
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="mb-2 block text-sm text-gray-500">Due Date</label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full rounded-lg border border-gray-300 bg-transparent px-5 py-4 outline-none focus:border-[#974FD0]"
            />
          </div>

          {/* Error */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Done */}
          <button
            onClick={handleSubmit}
            className="w-full rounded-lg bg-[#974FD0] py-4 text-lg font-medium text-white hover:bg-purple-700"
          >
            Done
          </button>

          <div className="text-center">
            <a href="#top" className="text-sm text-[#974FD0] underline">
              Back To Top
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewTask;
