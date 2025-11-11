# Frontend – User Management Console (Next.js)

## Overview
This project is the **frontend implementation** of the **User Management Console**, developed using **Next.js (App Router)**.  
It connects with the **Node.js + Express + MongoDB backend** and provides a complete client-side interface for managing users, their preferences, and posts.

---

## Features

- Display a list of users (with pagination-ready structure)
  
- View full user details, including related posts and preferences
   
- Create new users through a responsive form
   
- Update user status (Active/Inactive)
  
- Soft delete users (mark as deleted without removing data immediately)
  
- Manage posts and preferences for each user
  
- Dynamic fetching using REST APIs
  
- Client-side rendering using Next.js App Router
   
- State management using React Hooks (`useState`, `useEffect`)
  
- Organized folder structure for scalability and maintainability
  

## Project Structure
```
frontend-week1/
├── .env.local
├── lib/
│ └── api.js
├── hooks/
│ ├── useUsers.js
│ └── useUserDetails.js
├── components/
│ ├── UserTable.jsx
│ ├── UserForm.jsx
│ ├── PreferenceCard.jsx
│ └── PostList.jsx
└── app/
├── create/
│ └── page.jsx
├── users/
│ └── page.jsx
└── users/[id]/
└── page.jsx
```

## Tech Stack
- **Frontend Framework:** Next.js 14 (App Router)  
- **Language:** JavaScript 
- **State Management:** React Hooks (`useState`, `useEffect`)  
- **UI Components:** Tailwind CSS or custom CSS  
- **Backend Communication:** REST APIs using `fetch()`  
- **Environment Management:** `.env.local` file  
- **Testing (Optional):** Jest and React Testing Library

## Environment Setup
### 1. Clone the Repository
```
git clone https://github.com/<your-username>/frontend-week1.git
cd frontend-week1
```
### 2. Install Dependencies
```
npm install
```
### 3. Add Environment Variables
-Create a .env.local file in the root directory with:
```
EXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```
### 4. Run the Development Server
```
npm run dev
```
The application will start at http://localhost:3000
### 5. Ensure Backend is Running

-Run your backend server (npm run dev)

-Make sure MongoDB Atlas is connected

## API Endpoints (Backend Integration)
| Method | Endpoint                     | Description                                 |
| ------ | ---------------------------- | ------------------------------------------- |
| GET    | `/users`                     | Get all users                               |
| GET    | `/users/:id`                 | Get user details with posts and preferences |
| POST   | `/users`                     | Create a new user                           |
| PUT    | `/users/:id`                 | Update user status                          |
| DELETE | `/users/:id`                 | Soft delete user                            |
| GET    | `/users/:userId/preferences` | Fetch user preferences                      |
| PUT    | `/users/:userId/preferences` | Create or update user preferences           |
| GET    | `/users/:userId/posts`       | Fetch user posts                            |
| POST   | `/users/:userId/posts`       | Create a new post                           |


## Functional Requirements (Implemented)

| ID | Feature       | Description                                        |
| -- | ------------- | -------------------------------------------------- |
| U1 | User List     | Display a dynamic list of users                    |
| U2 | User Details  | Show complete user info with posts and preferences |
| U3 | Create User   | Provide a form to add new users                    |
| U4 | Update Status | Toggle user active/inactive                        |
| U5 | Soft Delete   | Mark users as deleted                              |

## Folder Purpose

| Folder        | Description                             |
| ------------- | --------------------------------------- |
| `/lib`        | Handles backend API calls using fetch   |
| `/hooks`      | Custom React hooks for reusable logic   |
| `/components` | UI components (tables, forms, cards)    |
| `/app`        | Next.js App Router pages                |
| `.env.local`  | Contains API URL for connecting backend |

## Future Improvements

-Add pagination to the user list

-Add search and filter options

-Integrate Shadcn UI or Tailwind CSS for modern styling

-Add testing for hooks and form validation

-Implement authentication and role-based access

## How It Works

-The frontend sends REST API calls to the backend.

-The backend communicates with MongoDB and returns responses.

-The frontend updates the state dynamically and renders updated data.

-Soft-deleted users remain in the database but are marked as inactive (isDeleted: true).

