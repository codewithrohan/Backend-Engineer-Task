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
- `PATCH /api/tasks/update/:taskId` - Update Task.
- `PATCH /api/subtasks/update/:subtaskId` - Update Subtask.
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


# Postman Api Testing Screenshots - 

## DELETE Method for Task Api : 
( Getting id to delete )
![Delete compare-1](https://github.com/codewithrohan/Backend-Engineer-Task/assets/71711650/2eba74cf-0a20-44c0-bba6-6d310e44161e)

![Delete compare-2](https://github.com/codewithrohan/Backend-Engineer-Task/assets/71711650/c3c8f8c9-e4f3-42c7-bdbf-e2fe788c7eee)

## GET Method for Task Api :
![GET Task](https://github.com/codewithrohan/Backend-Engineer-Task/assets/71711650/e2ff6d09-0d63-487d-808b-769222842256)


## PATCH Method for Task Api :
![PATCH compare 1](https://github.com/codewithrohan/Backend-Engineer-Task/assets/71711650/f7d4c41f-e61d-4acd-a4fa-1fa5131e6049)

![PATCH compare 2](https://github.com/codewithrohan/Backend-Engineer-Task/assets/71711650/69f291df-ad97-4cac-8e19-749c9ba4f9fc)

## POST Method for Task Api :
![POST_task](https://github.com/codewithrohan/Backend-Engineer-Task/assets/71711650/67e8c75e-02d7-4299-9b89-f3b92c7de35f)


## GET Method for Subtask Api :
![GET SubTask](https://github.com/codewithrohan/Backend-Engineer-Task/assets/71711650/cae8404a-4632-4504-97b2-a6349a408b9b)


## PATCH Method for Subtask Api :
![Patch Subtask compare-1](https://github.com/codewithrohan/Backend-Engineer-Task/assets/71711650/de437a17-ceb5-4acd-9949-5613ecdc386e)

![Patch Subtask compare-2](https://github.com/codewithrohan/Backend-Engineer-Task/assets/71711650/a02e9477-0551-4171-b5d2-994b33eb50c5)


## DELETE Method for Subtask Api :
![subtask delete compare-1](https://github.com/codewithrohan/Backend-Engineer-Task/assets/71711650/ab85160c-974f-4eca-962f-9d27779813e4)

![subtask delete compare-2](https://github.com/codewithrohan/Backend-Engineer-Task/assets/71711650/92a413e2-bf45-4b6f-a883-d0a68463df7c)


## POST Method for Subtask Api :
![POST SubTask](https://github.com/codewithrohan/Backend-Engineer-Task/assets/71711650/9f3864be-4c39-46ca-8d70-98e1736faa29)

