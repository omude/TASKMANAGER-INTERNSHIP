import { Router } from "express";
import protect from "../middleware/authMiddleware";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/taskControllers";

const router = Router();
router.use(protect);
router.post("/", createTask);

router.get("/", getTasks);

router.get("/:id", getTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
