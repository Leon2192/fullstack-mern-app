const express = require("express");
const router = express.Router();
const { authRequired } = require("../middlewares/validateToken");
const {
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  createTask,
} = require("../controllers/tasks");
const { validateSchema } = require("../middlewares/validatorMiddleware");
const { createTaskSchema } = require("../schemas/tasks");

router.get("/tasks", authRequired, getTasks);

router.get("/tasks/:id", authRequired), getTask;

router.post(
  "/tasks",
  authRequired,
  validateSchema(createTaskSchema),
  createTask
);

router.put("/tasks/:id", authRequired, updateTask);

router.delete("/tasks/:id", authRequired, deleteTask);

module.exports = router;
