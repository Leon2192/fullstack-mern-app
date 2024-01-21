const Task = require("../models/Task");

const getTasks = async (req, res) => {
  const tasks = await Task.find({
    user: req.user.id,
  }).populate("user");
  res.json(tasks);
};

const createTask = async (req, res) => {
  const { title, description, date } = req.body;

  const newTask = new Task({
    title,
    description,
    date,
    user: req.user.id,
  });

  const savedTask = await newTask.save();

  res.json(savedTask);
};

const getTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(400).json({ message: "Task not found" });
  res.json(task);
};

const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Dato nuevo
  });
  if (!task) return res.status(400).json({ message: "Task not found" });
  res.json(task);
};

const deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(400).json({ message: "Task not found" });
  return res.sendStatus(204);
};

module.exports = { getTasks, createTask, getTask, updateTask, deleteTask };
