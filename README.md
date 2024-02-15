# ProjectHub
ProjectHub is a web-based project management tool designed to create, track, and manage projects, tasks, and comments. It serves as a centralized platform where users can log in to define projects, break them down into actionable tasks, and comment on any task. ProjectHub is tailored for individual project users and those who prefer to handle all project-related activities in one place.

# Key Features
- **User Authentication:**
  - This secure login system provides unique IDs, usernames, and hashed passwords for each user.
- **Navigation and Routing:**
   - The application uses React Router for client-side routing, ensuring smooth navigation between different views like Home, Login, Sign up, Projects, Tasks, Comments, and user profiles.
   - A responsive navigation bar that adapts based on the user's authentication status. 
- **Project Creation:** 
    - Users can create new projects, giving each project a descriptive name and setting its initial status.
    - Users can edit and delete each project. 
- **Task Management:** 
    - Each project can have associated tasks, broken down into smaller stories. Tasks can be assigned priorities and tracked through various statuses.
    - Provides the ability to edit task details, including title, description, priority, and status, and delete a task.
- **Commenting:** 
    - Users can add comments to specific tasks.
    - Supports adding new comments and managing existing ones with the ability to edit and delete comments.
- **Form Validation:**
  - Form submissions for projects, tasks, and comments are validated using Yup to ensure all required fields are filled in correctly.
- **State Persistence:**
  - Stores user data in local storage, allowing persistent login sessions without constant re-authentication.

# Tech Stack
- **Backend:** Python with Flask provides a powerful framework for handling HTTP requests and interacting with the database.
- **Frontend:** React is used to offer user interfaces as well as a dynamic and responsive UI.
- **Database:** Flask's integration with SQLAlchemy allows for efficient data storage and retrieval. In addition, Flask-Migrate handles SQLAlchemy database migrations, and SQLite is used as a simple setup without needing a separate database server.

# Models
- **User Model:**
  - Each user has a unique ID, username, and hashed password. Users can have multiple projects and comments associated with them. The model includes validation for the username and email fields to ensure they are unique and meet specific criteria.

- **Project Model:**
  - Projects are created by users and have unique IDs, titles, descriptions, and statuses. They are linked to the User model through a many-to-many relationship via the user_project_association table, allowing multiple users to associate with multiple projects.

- **Task Model:**
  - Tasks are part of projects and are broken down into manageable units. Each task has a unique ID, a title, a description, a priority, and a status. Tasks are associated with a specific project and user and have validation to ensure that the title, description, priority, and status meet particular criteria.

- **Comment Model:**
  - Comments are made by users on tasks and have unique IDs and text. They are associated with the user who created the comment and the task to which it relates. The model includes validation to ensure that the comment text is not empty and does not exceed a certain length.

# Installation 
## Prerequisites
  - Python 3.8.13
  - Node.js and npm

## Backend Setup
1. Fork and clone this repository, and open it in your code editor.
2. Open a terminal and navigate to the project root directory.
3. Run `pipenv install` to install the backend dependencies.
4. Run `pipenv shell` to activate the virtual environment.
5. Navigate to the server directory by running `cd server`.
6. Initialize the database by running the following commands:
  - `flask db init`
  - `flask db migrate -m "Initial migration."`
  - `flask db upgrade`
7. Seed the database with initial data by running `python seed.py`.
8. Start the server by running `python app.py`. The server will be accessible at http://localhost:5555.

## Frontend Setup
1. Open a new terminal and navigate to the project root directory.
2. Navigate to the client directory by running `cd client`.
3. Install the frontend dependencies by running `npm install`.
4. Start the frontend development server by running `npm start`. The application will be accessible at http://localhost:3000.


# Contributing

Contributions are welcome! If you have suggestions, make an improvement, or encounter a bug, please open an issue. If you want to contribute code, please fork the repository and submit a pull request.

