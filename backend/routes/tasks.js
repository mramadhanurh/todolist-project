const express = require("express");
const { tasks } = require("../models");
const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await tasks.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch tasks" });
  }
});

// Get task by ID
router.get("/:id", async (req, res) => {
  try {
    const task = await tasks.findByPk(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch task" });
  }
});

// Create a new task
router.post("/", async (req, res) => {
  try {
    const { title, description, tags, status } = req.body;
    const newTask = await tasks.create({
      title,
      description,
      tags,
      status,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Unable to create task" });
  }
});

// Update a task
router.put("/:id", async (req, res) => {
  try {
    const { title, description, tags, status } = req.body;
    const task = await tasks.findByPk(req.params.id);

    if (task) {
      await task.update({
        title,
        description,
        tags,
        status,
      });
      res.json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to update task" });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const task = await tasks.findByPk(req.params.id);
    if (task) {
      await task.destroy();
      res.json({ message: "Task deleted" });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to delete task" });
  }
});

module.exports = router;