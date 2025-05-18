# Frontend Documentation for MERN Machine Test

## Overview

This project is a basic application built using the MERN stack (MongoDB, Express, React, Node.js) that allows for user authentication, agent management, and the uploading and distribution of lists.

## Features

1. **User Login**: 
   - Users can log in using their email and password.
   - Authentication is handled using JSON Web Tokens (JWT).

2. **Agent Management**: 
   - Admin users can create and manage agents.
   - Each agent has a name, email, mobile number, and password.

3. **CSV Upload and Distribution**: 
   - Users can upload CSV files containing lists of items.
   - The application validates the uploaded files and distributes the items equally among agents.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB database set up and running.

### Installation

1. Clone the repository:

   git clone <repository-url>

2. Navigate to the frontend directory:

   cd mern-machine-test/frontend

3. Install the dependencies:

   npm install

### Running the Application

1. Start the development server:

   npm start

2. Open your browser and navigate to `http://localhost:3000` to view the application.

## Folder Structure

- **src**: Contains all the source code for the frontend application.
  - **components**: Reusable React components.
    - `LoginForm.jsx`: Component for user login.
    - `AgentForm.jsx`: Component for adding and managing agents.
    - `CsvUpload.jsx`: Component for uploading CSV files.
    - `DistributedList.jsx`: Component for displaying distributed lists.
  - **pages**: Contains page components.
    - `Dashboard.jsx`: Main dashboard component.
    - `Agents.jsx`: Component for managing agents.
  - `App.jsx`: Main application component that sets up routing.
  - `index.js`: Entry point for the frontend application.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.