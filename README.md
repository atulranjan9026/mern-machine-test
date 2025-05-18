# MERN Machine Test

## Overview

This project is a basic application built using the MERN stack (MongoDB, Express, React, Node.js) that allows for user authentication, agent management, and the ability to upload and distribute lists.

## Features

1. **User Login**: Admin users can log in using their email and password. Authentication is handled using JSON Web Tokens (JWT).
2. **Agent Management**: Admin users can create and manage agents, including adding their details such as name, email, mobile number, and password.
3. **CSV Upload and Distribution**: Users can upload CSV files containing lists of items, which are then validated and distributed equally among agents.

## Project Structure

```
mern-machine-test
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── middleware
│   │   └── app.js
│   ├── package.json
│   └── README.md
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── README.md
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd mern-machine-test
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

### Usage

- Navigate to `http://localhost:3000` to access the application.
- Use the login form to authenticate as an admin user.
- Manage agents and upload CSV files through the dashboard.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.