# node-jwt-auth
Certainly! Here's a README file for the provided Node.js application:

# Node.js Authentication and Authorization Example

This is a simple Node.js application that demonstrates user registration, authentication, and authorization using Express.js, MongoDB, JWT (JSON Web Tokens), and bcrypt for password hashing. It includes routes for user registration, login, token refresh, and a protected profile route that requires authentication.

## Getting Started

To run this application locally, follow these steps:

### Prerequisites

Before running the application, make sure you have the following installed on your system:

- Node.js: You can download it from [nodejs.org](https://nodejs.org/).
- MongoDB: Install and run MongoDB locally or use a cloud-hosted MongoDB service.

### Installation

1. Clone this repository or download the source code.

2. Navigate to the project directory in your terminal.

3. Install the project dependencies by running:

   ```shell
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory of the project.

2. Add the following environment variables to the `.env` file:

   ```shell
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   REFRESH_TOKEN_SECRET=your_refresh_token_secret_key
   PORT=5000 # or your preferred port number
   ```

   Replace `your_mongodb_connection_string`, `your_jwt_secret_key`, and `your_refresh_token_secret_key` with your MongoDB connection string, JWT secret key, and refresh token secret key.

### Running the Application

1. Start the MongoDB server.

2. Run the application using the following command:

   ```shell
   npm start
   ```

   The server should start on the specified port (default is 5000). You can access the API endpoints at `http://localhost:5000`.

## API Endpoints

- `POST /register`: Register a new user.
- `POST /login`: Authenticate and generate an access token and refresh token.
- `DELETE /logout`: Log out and invalidate the refresh token.
- `POST /refresh-token`: Refresh the access token using a valid refresh token.
- `GET /profile`: Access the user's profile (protected route, requires authentication).

## Dependencies

- Express.js: Web application framework for handling HTTP requests.
- Mongoose: MongoDB object modeling for interacting with the database.
- Bcrypt.js: Library for hashing and verifying passwords.
- JSON Web Token (jsonwebtoken): For creating and verifying JWT tokens.
- dotenv: For loading environment variables from a `.env` file.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

This application is a basic example of user authentication and authorization in a Node.js application. It can serve as a starting point for building more complex authentication systems in your projects.
