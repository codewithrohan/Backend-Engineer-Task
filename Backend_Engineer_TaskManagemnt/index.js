const express = require("express");
const mongoose = require("mongoose");
const path = require('path');

// Importing middleware and routes
const authMiddleware = require('./middlewares/auth');
const usersRoutes = require('./routers/user_route');
const tasksRoutes = require('./routers/task_route');
const subTasksRoutes = require('./routers/subtask_route');

const app = express();
const PORT = 5000;

// View engine and views directory
app.set("view engine", "ejs");
app.set('views', path.resolve('./views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom middleware example
app.use('/', (req, res, next) => {
  console.log('Middleware running');
  next();
});

// Routes
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/api/users", usersRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/subtasks', subTasksRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/taskapp")
  .then(() => {
    console.log("Connected to MongoDB");
    // Start server after successful connection
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });
