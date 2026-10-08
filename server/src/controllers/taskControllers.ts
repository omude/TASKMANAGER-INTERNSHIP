import { Response } from "express";
import { AuthRequest } from "../types/authRequest";
import Task from "../models/taskModel";

// Check if a date is before today
const isPastDate = (date: string): boolean => {
  const selectedDate = new Date(date);

  if (isNaN(selectedDate.getTime())) {
    return false;
  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  return selectedDate < today;
};

// Create a new task
export const createTask = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Not Authorized" });
      return;
    }

    const { title, description, dueDate, category, completed } = req.body;

    // Check required fields
    if (!title || !description || !dueDate || !category) {
      res.status(400).json({
        message: "All fields are required",
      });
      return;
    }

    // Check if the date is valid
    const taskDate = new Date(dueDate);

    if (isNaN(taskDate.getTime())) {
      res.status(400).json({
        message: "Invalid due date",
      });
      return;
    }

    // Check if the date is in the past
    if (isPastDate(dueDate)) {
      res.status(400).json({
        message: "Due date cannot be in the past",
      });
      return;
    }

    // Create the task
    const task = await Task.create({
      title,
      description,
      dueDate,
      category,
      completed: completed ?? false,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server Error";

    res.status(500).json({ message });
  }
};

// Get all tasks belonging to the logged-in user
export const getTasks = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        message: "Not Authorized",
      });
      return;
    }

    const search = req.query.search?.toString().trim();
    let tasks;

    if (search) {
      tasks = await Task.find({
        user: req.user._id,
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      }).sort({
        createdAt: -1,
      });
    } else {
      tasks = await Task.find({
        user: req.user._id,
      }).sort({
        createdAt: -1,
      });
    }

    res.status(200).json({
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server Error";

    res.status(500).json({ message });
  }
};

// Get one task belonging to the logged-in user
export const getTask = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        message: "Not Authorized",
      });
      return;
    }

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      res.status(404).json({
        message: "Task not found",
      });
      return;
    }

    res.status(200).json({
      task,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server Error";

    res.status(500).json({ message });
  }
};

// Update one task belonging to the logged-in user
export const updateTask = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        message: "Not Authorized",
      });
      return;
    }

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      res.status(404).json({
        message: "Task not found",
      });
      return;
    }

    const { title, description, dueDate, category, completed } = req.body;

    // Only validate the date if a new date was provided
    if (dueDate) {
      const taskDate = new Date(dueDate);

      if (isNaN(taskDate.getTime())) {
        res.status(400).json({
          message: "Invalid due date",
        });
        return;
      }

      if (isPastDate(dueDate)) {
        res.status(400).json({
          message: "Due date cannot be in the past",
        });
        return;
      }
    }

    // Update only the fields that were provided
    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.dueDate = dueDate ?? task.dueDate;
    task.category = category ?? task.category;
    task.completed = completed ?? task.completed;

    await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server Error";

    res.status(500).json({ message });
  }
};

// Delete one task belonging to the logged-in user
export const deleteTask = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        message: "Not Authorized",
      });
      return;
    }

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      res.status(404).json({
        message: "Task not found",
      });
      return;
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server Error";

    res.status(500).json({ message });
  }
};
