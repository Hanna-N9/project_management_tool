# ProjectHub
Welcome to ProjectHub, the ultimate tool for managing your projects, tasks, and comments. ProjectHub is designed to simplify the process of creating, assigning, and tracking tasks within your projects, ensuring clear communication and efficient project management.

# Key Features
- **User Authentication:** Secure login system with unique IDs, usernames, and hashed passwords for each user.
- **Project Creation:** Users can create and manage projects with a simple interface.
- **Task Management:** Break down projects into actionable tasks and track the progress. 
- **Commenting:** Leave comments on tasks.

# Tech Stack
- **Backend:**  Python with Flask provides a powerful framework for handling HTTP requests and interacting with the database.
- **Frontend:**  React offers a dynamic and responsive UI, delivering a seamless user experience across devices.
- **Database:**  Flask's integration with SQLAlchemy allows for efficient data storage and retrieval.

# Models
## User Model
Each user has a unique ID, username, and hashed password for secure authentication.

## Project Model
Projects are uniquely identified, linked to the creator's user ID, and contain a descriptive name.

## Task Model
Tasks are broken down into manageable units, each having a unique ID, associated project ID, assigned user ID, and a detailed description.

## Comment Model
Comments facilitate discussion on tasks, with a unique ID, the user who wrote it, the associated task ID, and the comment text.

# Installation
- Fork and clone this repository, and open it in your code editor
- Open a terminal
  - Run `pipenv install` to install the dependencies
  - Run `pipenv shell` to create a virtual environment
  - Navigate to the server directory by `cd server`
  - To create a database is to run these commands,
      - `flask db init`
      - `flask db migrate -m "Initial migration."`
      - `flask db upgrade`
  - Run `python seed.py`
  - Run `python app.py` to start the server
- Open another terminal
  - Navigate to the client directory by `cd client`
  - Run `npm install` to install dependencies
  - Run `npm start` to start a server

# Contributing

Contributions are welcome! If you have suggestions, make an improvement, or encounter a bug, please open an issue. If you want to contribute code, please fork the repository and submit a pull request.

