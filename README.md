Backend Week 1 Task:

A simple backend application built with Node.js, Express, and MongoDB Atlas.
It handles user management, preferences, and posts with proper data validation and soft delete logic.

Features:

User APIs for create, read, update, soft delete, and hard delete (with 24-hour grace period)

Preferences APIs to create or update user preferences

Post APIs to create, read, and soft delete user posts

MongoDB Atlas and Mongoose used for data modeling

Simple and modular folder structure for scalability and maintainability

Tech Stack:

Node.js

Express.js

MongoDB Atlas

Mongoose

Clone this repository:
```
git clone https://github.com/dhanushshruthi/task1-backend.git
cd task1-backend
```
.env

```
PORT=5000
MONGO_URI=<your_mongodb_atlas_connection_string>
```

API Endpoints


| Method | Endpoint                            | Description                  |
| ------ | ----------------------------------- | ---------------------------- |
| POST   | `/api/v1/users`                     | Create a new user            |
| GET    | `/api/v1/users/:userId`             | Get user by ID               |
| PUT    | `/api/v1/users/:userId`             | Update user                  |
| DELETE | `/api/v1/users/:userId`             | Soft delete user             |
| POST   | `/api/v1/users/:userId/purge`       | Hard delete user (after 24h) |
| PUT    | `/api/v1/users/:userId/preferences` | Create or update preferences |
| GET    | `/api/v1/users/:userId/preferences` | Get user preferences         |
| POST   | `/api/v1/users/:userId/posts`       | Create post                  |
| GET    | `/api/v1/users/:userId/posts`       | Get all posts for a user     |
| DELETE | `/api/v1/posts/:postId`             | Soft delete post             |

Structure:

backend-week1/
│
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── user.controller.js
│   │   ├── post.controller.js
│   │   └── preference.controller.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── post.model.js
│   │   └── preference.model.js
│   └── routes/
│       └── index.js
│
├── server.js
├── .env
├── package.json
└── README.md
