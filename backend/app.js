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

const index = require("./routes/index");
app.use("/", index);
app.use(errorMiddleware);

module.exports = { app, server };
