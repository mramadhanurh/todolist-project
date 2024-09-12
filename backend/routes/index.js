const express = require("express");
const router = express.Router();
const { tasks } = require('../models');

router.get("/", async function (req, res, next) {
  return res.send("hello world");
});

router.get('/tasks', async (req, res) => {
  try {
    const allTasks = await tasks.findAll();
    res.json(allTasks);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch tasks' });
  }
});

router.post("/tasks", async (req, res) => {
  try {
    const { title, description, tags, status } = req.body; // Ambil data dari request body

    // Buat task baru
    const newTask = await tasks.create({
      title,
      description,
      tags,
      status,
    });

    res.status(201).json(newTask); // Kembalikan task yang baru dibuat
  } catch (error) {
    console.error(error); // Log error untuk debugging
    res.status(500).json({ error: "Unable to create task" });
  }
});

module.exports = router;
