# API

## Description

This project is an Authentication API built with Node.js, Express, TypeScript, and JSON Web Token (JWT), providing various functionalities and endpoints for user authentication, and note management.

## Features

-   User authentication with bcrypt and JWT
-   Environment variable management with dotenv
-   MongoDB integration with Mongoose
-   Notes management with CRUD operations

## Installation

### Prerequisites

-   Docker
-   Node.js (version 20.15.1)
-   npm (version X.X.X)

### Steps

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/api.git
    cd api
    ```

2. Copy the `.env.example` file to `.env`:

    ```sh
    cp .env.example .env
    ```

3. Update the .env file with your environment variables.

4. Install dependencies:

    ```sh
    npm install
    ```

## Usage

### Using docker

Build the Docker image:

```sh
docker build -t api .
```

Run the Docker container with environment variables:

```sh
docker run -d \
    -p 3000:3000 \
    -e MONGO_URI=YOUR_MONGO_URI \
    -e JWT_SECRET=YOUR_JWT_SECRET \
    --name api \
    api
```

### Using Node.js and npm

Start the development server:

```sh
npm run dev
```

Build the project for production:

```sh
npm run build
```

Start the application:

```sh
npm start
```

## Use API

## API Endpoints

**Create User**

-   **Endpoint:** `POST /signup`
-   **Body:** `{ "email": "user_email", "password": "user_password", "name": "user_name" }`
-   **Response:** `{ "success": true, "message": "User created successfully" }`

**Authenticate User**

-   **Endpoint:** `POST /login`
-   **Body:** `{ "email": "user_email", "password": "user_password" }`
-   **Response:** `{ "success": true, "token": "your_jwt_token" }`

> ### The next endpoints require the user token returned by the login endpoint as authorization header: `req.headers.authorization`

**Get User Info**

-   **Endpoint:** `POST /user`
-   **Response:** `{ "success": true, "user": { "id": "user_id", "email": "user_email", "name": "user_name" } }`

**Get Authenticated User Notes**

-   **Endpoint:** `GET /note`
-   **Response:** `{ "success": true, "user_id": "user_id", "notes": [{ "id": "note_id", "title": "note_title", "content": "note_content", "created_at": "timestamp", "updated_at": "timestamp" }] }`

**Create Note**

-   **Endpoint:** `POST /note`
-   **Body:** `{ "title": "note_title", "content": "note_content" }`
-   **Response:** `{ "success": true, "message": "Note created" }`

**Update Note**

-   **Endpoint:** `PUT /note/:id`
-   **Body:** `{ "title": "note_title", "content": "note_content" }`
-   **Response:** `{ "success": true, "message": "Note updated" }`

**Delete Note**

-   **Endpoint:** `DELETE /note/:id`
-   **Response:** `{ "success": true, "message": "Note deleted" }`

## Scripts

Commonly used npm scripts:

-   `npm run clean`: Remove the `dist` directory
-   `npm run dev`: Start the development server with `ts-node-dev`
-   `npm run build`: Compile TypeScript to JavaScript
-   `npm start`: Start the compiled application

## Source Folder Structure

-   `src/`: Source code
    -   `database/`: Database files
        -   `models/`: Mongoose models
        -   `connect.ts`: Database connection
    -   `utils/`: Utility functions
    -   `index.ts`: Main entry point

## Contributing

Guidelines for contributing to the project.

## License

This project is licensed under the terms of the MIT license.
