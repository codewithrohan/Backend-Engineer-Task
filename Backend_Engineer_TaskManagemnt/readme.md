# Task Manager API

A robust Task Manager API built with Express.js and MongoDB, offering comprehensive functionality for managing tasks, subtasks, and users. The API includes secure authentication using JWT tokens.

## Features

- **Task Creation:** Create tasks with titles, descriptions, and due dates, authenticated via JWT tokens.
- **Subtask Creation:** Add subtasks to existing tasks for more granular organization.
- **Filtering and Pagination:** Filter tasks by priority and due date, with pagination support for large sets of tasks.
- **Subtask Filtering:** Retrieve subtasks associated with specific tasks.
- **Task and Subtask Updates:** Update task due dates and statuses, and subtask statuses.
- **Soft Deletion:** Soft delete tasks and subtasks for potential recovery or archival.

## Data Models

### Subtask
- `id` (int, unique identifier)
- `task_id` (int) // references task table
- `title` (String)
- `status` (0, 1) // 0 - incomplete, 1 - complete
- `created_at` (date/string)
- `updated_at` (date/string)
- `deleted_at` (date/string)

### User
- `id` (int, unique identifier)
- `phone_number` (num)
- `password` (String)
- `priority` (0, 1, 2) // for Twilio calling priority

### Task
- Additional Fields: Title, Description, Due Date, Priority, Status

## Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up MongoDB and update the connection string in the code.
4. Run the server: `npm start`.

## Getting the TokenId.

1. Go to- http://localhost:5000/ you will redirect to index.ejs.
2. click 'Register' If new here / otherwise 'Login' if already registered.
3. Fill the credentials.
4. After successfully login ,you will be redirected to your 'Dashboard' where you can find your token id.

## Using TokenId in Postman for testing 

1. Open Postman and set your method along with the url path 
2. Go to Authorization section
3. Set  { Type - Bearer Token } and add your 'JWT Token' in { Token }
4. Now you can perform all the methods

## API Endpoints

### Tasks

- `POST /api/tasks/` - Create Task.
- `POST /api/subtasks/` - Create Subtask.
- `GET /api/tasks/` - Get User Tasks.
- `GET /api/subtasks/` - Get User Subtasks.
- `PUT /api/tasks/update/:taskId` - Update Task.
- `PUT /api/subtasks/update/:subtaskId` - Update Subtask.
- `DELETE /api/tasks/delete/:taskId` - Delete Task.
- `DELETE /api/subtasks/delete/:subtaskId` - Delete Subtask.

### Users

- `POST /api/users/register` - Register User.
- `POST /api/users/login` - User Login.
- `GET  /` - Index Page
  
## Usage

1. Users Need to Register/log in, in order to receive a JWT Auth Token.
2. Use the token for authenticated requests to the tasks and subtasks endpoints in postman.
3. Check Postman Testing folders to see all the apis testing 
