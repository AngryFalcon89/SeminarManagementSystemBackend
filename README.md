# Seminar Management System Backend

Welcome to the Seminar Management System Backend repository! This backend server is designed to support a Seminar Management System, providing authentication, book-related functionalities, MongoDB integration, and Redis for token management. Below is a comprehensive guide on how to set up, use, and understand the components of this backend system.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Endpoints](#endpoints)
- [How to Use](#how-to-use)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This backend application is built using Node.js, Express.js, MongoDB, and Redis. It supports user authentication and book management for a Seminar Management System. The codebase is organized into controllers, routes, models, and helper functions for modularity and maintainability.

## Features

1. **User Authentication:**
   - Register new users.
   - Login existing users.
   - Generate and verify JWT access and refresh tokens.
   - Logout and invalidate refresh tokens using Redis.

2. **Book Management:**
   - Retrieve all books with pagination.
   - Search for books based on author, title, or publisher.
   - Add, update, and delete books.

3. **Database Integration:**
   - Connects to MongoDB using Mongoose.
   - Provides a schema for the `Book` model.
   - Implements user authentication with the `User` model.

4. **Token Management with Redis:**
   - Utilizes Redis for storing and managing refresh tokens.
   - Ensures secure and scalable token handling.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/seminar-management-backend.git
   cd seminar-management-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the server:
   ```bash
   npm start
   ```

## Configuration

1. **Environment Variables:**
   - Create a `.env` file in the project root.
   - Define the following variables:
     ```env
     PORT=3000
     USERNAME=your_mongodb_username
     PASSWORD=your_mongodb_password
     ACCESS_TOKEN_SECRET=your_access_token_secret
     REFRESH_TOKEN_SECRET=your_refresh_token_secret
     REDIS_PORT=6379
     REDIS_HOST=127.0.0.1
     ```

2. **MongoDB:**
   - Create a MongoDB Atlas account and set up a cluster.
   - Replace `your_mongodb_username` and `your_mongodb_password` in the `.env` file with your MongoDB Atlas credentials.

3. **Redis:**
   - Install and run a Redis server locally or use a hosted service.
   - Update `REDIS_PORT` and `REDIS_HOST` in the `.env` file accordingly.

## Endpoints

### Authentication

- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Login and get access and refresh tokens.
- `POST /auth/refresh-token`: Refresh the access token.
- `DELETE /auth/logout`: Logout and invalidate the refresh token.

### Book Management

- `GET /book/getAllBooks`: Retrieve all books with pagination.
- `GET /book/search`: Search for books based on author, title, or publisher.
- `POST /book/addBook`: Add a new book (requires authentication).
- `PUT /book/update`: Update a book (requires authentication).
- `DELETE /book/delete`: Delete a book (requires authentication).

## How to Use

1. **Register a User:**
   - Send a `POST` request to `/auth/register` with JSON payload:
     ```json
     {
       "email": "user@example.com",
       "password": "password"
     }
     ```

2. **Login and Get Tokens:**
   - Send a `POST` request to `/auth/login` with the same JSON payload as registration.
   - Receive access and refresh tokens.

3. **Access Protected Endpoints:**
   - Include the access token in the `Authorization` header for requests to protected endpoints.

4. **Refresh Access Token:**
   - To refresh the access token, send a `POST` request to `/auth/refresh-token` with the refresh token.

5. **Logout:**
   - To logout and invalidate the refresh token, send a `DELETE` request to `/auth/logout` with the refresh token.

6. **Book Management:**
   - Utilize the book-related endpoints to manage books as described in the [Endpoints](#endpoints) section.

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md) before submitting any changes.

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to reach out if you have any questions or need further assistance!
