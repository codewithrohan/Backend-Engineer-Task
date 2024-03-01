const express = require('express');
const route = express.Router();
const Task = require('../models/task_model');
const authMiddleware = require('../middlewares/auth');

const moment = require('moment');

// Create Task
route.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    const user = req.user; // from decoded JWT token

    if (!user || !user.userId) {
      console.error('Invalid user data in JWT:', user);
      return res.status(401).json({ error: 'Invalid user data in JWT' });
    }

    const formattedDueDate = moment(due_date, 'DD/MM/YYYY', true);

    if (!formattedDueDate.isValid()) {              
      return res.status(400).json({ error: 'Invalid due_date format. Please use DD/MM/YYYY' });     //  if user enter date in wrong format
    }     

    const newTask = new Task({
      user_id: user.userId,
      title,
      description,
      due_date: formattedDueDate.toDate(), // This will save as Date object
    });

    const savedTask = await newTask.save();

    res.status(201).json({ message: 'Task created successfully', task: savedTask });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// Get all user tasks with filters and pagination
route.get('/', authMiddleware, async (req, res) => {
  try {

    
    const user = req.user;
    const { priority, due_date, page, pageSize } = req.query;

    let filters = { user_id: user.userId };

    // Apply filters based on user input
    //It applies the filters, calculates skip and limit for pagination, 
    //retrieves tasks from the database, and returns them along with the total count of tasks.

    if (priority !== undefined) {
      filters.priority = priority;
    }

    if (due_date !== undefined) {
      filters.due_date = { $lte: new Date(due_date) };
    }

    // Calculate skip and limit for pagination
    const skip = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

    const tasks = await Task.find(filters)
      .sort({ due_date: 1 }) // Sorting in ascending order
      .skip(skip)
      .limit(limit);

    const totalTasksCount = await Task.countDocuments(filters);

    return res.status(200).json({ tasks, totalTasksCount });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//Update task
route.patch("/:taskId", authMiddleware, async (req, res) => {
  try {
    const { due_date, status } = req.body;

    if (status && status !== "TODO" && status !== "DONE") {         // check if status feild is valid
      return res.status(400).json({ error: "Invalid status. Status must be 'TODO' or 'DONE'" });
    }

    //It validates the status field, constructs an update object
  // based on the provided fields, updates the task in the database, and returns the updated task

    const updatedFields = {};       //validates the update feild 
    if (due_date) updatedFields.due_date = due_date;
    if (status) updatedFields.status = status;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      updatedFields,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Delete task
route.delete('/:taskId', authMiddleware, async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        deleted_at: new Date(),
      },
      { new: true }
    );

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal error server' });
  }
});

module.exports = route;
