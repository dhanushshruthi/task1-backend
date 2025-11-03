This project is a simple **Node.js + Express + MongoDB** backend application that performs CRUD operations on **Users**, **Preferences**, and **Posts**.  
It demonstrates how to build and connect RESTful APIs with MongoDB Atlas.

Features:
- Create, Read, Update, Soft Delete, and Hard Delete Users
- Add and Retrieve User Preferences
- Create and Soft Delete Posts
- MongoDB Atlas cloud connection
- Modular code structure with controllers, routes, and configuration

Project Structure:
  backend-week1/
│
├── src/
│ ├── config/
│ │ └── db.js # MongoDB connection setup
│ ├── controllers/
│ │ ├── user.controller.js
│ │ ├── post.controller.js
│ │ └── preference.controller.js
│ ├── models/
│ │ ├── user.model.js
│ │ ├── post.model.js
│ │ └── preference.model.js
│ └── routes/
│ └── index.js # All API routes
│
├── server.js # Application entry point
├── .env # Environment variables (MongoDB URI, Port)
├── package.json

### 1. Clone this repository:
```bash
git clone https://github.com/dhanushshruthi/backend-week1.git
cd backend-week1
```
###.env file:
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

API Endpoints:
User APIs
Method	  Endpoint	                Description
POST	 /api/v1/users	          Create a new user
GET	   /api/v1/users/:id	      Get user by ID
PUT	   /api/v1/users/:id	      Update user by ID
DELETE /api/v1/users/:id	      Soft delete user
POST	 /api/v1/users/:id/purge	Hard delete user
Preference APIs
Method	        Endpoint	                         Description
PUT	/api/v1/users/:userId/preferences  	Create or update user preferences
GET	/api/v1/users/:userId/preferences 	Get preferences for a user
Post APIs
Method	      Endpoint	                      Description
POST	  /api/v1/users/:userId/posts	 Create a new post for a user
GET	    /api/v1/users/:userId/posts  Get all posts by a user
DELETE	/api/v1/posts/:postId	       Soft delete a post

Technologies Used:
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose ODM
- dotenv for environment management

Acknowledgement:
This project was built as part of the Backend Week 1 assignment, focusing on building RESTful APIs and connecting to MongoDB Atlas.
