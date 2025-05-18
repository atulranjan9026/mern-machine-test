# Backend Documentation

## Overview

This backend application is built using the MERN stack (MongoDB, Express, React, Node.js) and provides functionalities for user authentication, agent management, and list distribution.

## Features

1. **User Authentication**
   - Admin user login using email and password.
   - JSON Web Tokens (JWT) for secure authentication.

2. **Agent Management**
   - Create, update, and manage agents.
   - Each agent has a name, email, mobile number, and password.

3. **CSV Upload and Distribution**
   - Upload CSV files containing lists of items.
   - Validate uploaded files to ensure they are in the correct format (CSV, XLSX, or XLS).
   - Distribute items from the uploaded lists equally among agents.

## Project Structure

```
backend
├── src
│   ├── controllers         # Contains controller logic for handling requests
│   │   ├── agentController.js
│   │   ├── authController.js
│   │   └── listController.js
│   ├── models              # Contains Mongoose models for MongoDB
│   │   ├── Agent.js
│   │   ├── User.js
│   │   └── List.js
│   ├── routes              # Contains route definitions
│   │   ├── agentRoutes.js
│   │   ├── authRoutes.js
│   │   └── listRoutes.js
│   ├── middleware          # Contains middleware functions
│   │   └── auth.js
│   └── app.js              # Entry point for the application
├── package.json            # NPM package configuration
└── README.md               # Documentation for the backend
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory:
   ```
   cd mern-machine-test/backend
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up environment variables (e.g., MongoDB connection string, JWT secret).

5. Start the server:
   ```
   npm start
   ```

## API Endpoints

- **Authentication**
  - `POST /api/auth/login` - Login and receive a JWT.

- **Agents**
  - `POST /api/agents` - Create a new agent.
  - `GET /api/agents` - Retrieve all agents.

- **Lists**
  - `POST /api/lists/upload` - Upload a CSV file and distribute items.

## Usage

After starting the server, you can use tools like Postman to interact with the API endpoints. Ensure to include the JWT in the Authorization header for protected routes.

## License

This project is licensed under the MIT License.