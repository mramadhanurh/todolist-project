"use strict";
const express = require("express");
const path = require("path");

/**
 * dotenv
 */
require("dotenv").config();
const errorMiddleware = require("./utils/ErrorMiddleware");

const app = express();
const server = require("http").createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

// Import koneksi database dan model
const { sequelize, tasks } = require("./models");

// Sinkronisasi model dengan database MySQL
sequelize
  .sync({ alter: true }) // alter: true untuk menyesuaikan tabel tanpa menghapus data
  .then(() => {
    console.log("Database synced and tables created!");
  })
  .catch((err) => {
    console.error("Unable to sync database:", err);
  });

// Route utama
const index = require("./routes/index");
app.use("/", index);

const tasksRoute = require("./routes/tasks");
app.use("/tasks", tasksRoute);

// Error handling middleware
app.use(errorMiddleware);

module.exports = { app, server };