const Task = require("../models/taskModel");
const mongoose = require("mongoose");

// get all tasks
const getTasks = async (req, res) => {
  const tasks = await Task.find({}).sort({ createdAt: -1 });

  res.status(200).json(tasks);
};

// get all tasks that are active
const getActiveTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ status: "active" }).sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get all tasks that are archived
const getArchiveTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ status: "archive" }).sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get a single task
const getTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Task" });
  }

  if (!task) {
    return res.status(400).json({ error: "No such Task" });
  }

  res.status(200).json(task);
};

// create a new task
const createTask = async (req, res) => {
  const { title, content, tags } = req.body;

  // add doc to database
  try {
      // Assuming Task is your Mongoose model for tasks
      const task = await Task.create({ title, content, tags });
      res.status(200).json(task);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Task" });
  }

  const task = await Task.findOneAndDelete({ _id: id });

  if (!task) {
    return res.status(400).json({ error: "No such Task" });
  }

  res.status(200).json(task);
};

// Archive a task instead of deleting
const archiveTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Task" });
  }

  const task = await Task.findOneAndUpdate(
    { _id: id },
    {
      status: "archive",
    }
  );

  if (!task) {
    return res.status(400).json({ error: "No such Task" });
  }

  res.status(200).json(task);
};

// set a task as Active
const setActiveTask = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such Task" });
    }
  
    const task = await Task.findOneAndUpdate(
      { _id: id },
      {
        status: "active",
      }
    );
  
    if (!task) {
      return res.status(400).json({ error: "No such Task" });
    }
  
    res.status(200).json(task);
  };

// update a task
const updateTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Task" });
  }

  const task = await Task.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!task) {
    return res.status(400).json({ error: "No such Task" });
  }

  res.status(200).json(task);
};

module.exports = {
  createTask,
  getActiveTasks,
  getArchiveTasks,
  getTasks,
  getTask,
  deleteTask,
  archiveTask,
  setActiveTask,
  updateTask,
};
