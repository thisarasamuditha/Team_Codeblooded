# Team Codeblooded Backend

A robust Node.js and Express.js backend API with MongoDB Atlas integration.

## Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **User Management**: User registration, login, profile management
- **Group Management**: Create, join, leave groups with role-based access
- **Security**: Helmet for security headers, CORS configuration, input validation
- **Database**: MongoDB Atlas integration with Mongoose ODM
- **Error Handling**: Comprehensive error handling and logging
- **Environment Configuration**: Secure environment variable management

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your actual values.

4. **Start the server**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

### API Endpoints

#### Authentication Routes (`/api/auth`)

- `POST /register` - Register a new user
- `POST /login` - Login user
- `GET /me` - Get current user (protected)
- `POST /logout` - Logout user (protected)

#### User Routes (`/api/users`)

- `GET /` - Get all users (protected)
- `GET /:id` - Get user by ID (protected)
- `PUT /profile` - Update user profile (protected)
- `DELETE /account` - Deactivate account (protected)

#### Group Routes (`/api/groups`)

- `GET /` - Get all groups with filters (protected)
- `POST /` - Create a new group (protected)
- `GET /:id` - Get group by ID (protected)
- `POST /:id/join` - Join a group (protected)
- `POST /:id/leave` - Leave a group (protected)

### Environment Variables

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
DB_NAME=team_codeblooded
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=24h
CORS_ORIGIN=http://localhost:3000
BCRYPT_ROUNDS=12
```

### Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/             # Route handlers
│   ├── middleware/
│   │   ├── auth.js             # Authentication middleware
│   │   └── errorHandler.js     # Error handling middleware
│   ├── models/
│   │   ├── User.js             # User model
│   │   └── Group.js            # Group model
│   ├── routes/
│   │   ├── auth.js             # Authentication routes
│   │   ├── users.js            # User routes
│   │   └── groups.js           # Group routes
│   └── server.js               # Main server file
├── .env                        # Environment variables
├── .env.example               # Environment template
├── .gitignore                 # Git ignore file
└── package.json               # Dependencies and scripts
```

### Testing the API

1. **Health Check**

   ```bash
   GET http://localhost:5000/health
   ```

2. **Register a User**

   ```bash
   POST http://localhost:5000/api/auth/register
   Content-Type: application/json

   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123"
   }
   ```

3. **Login**

   ```bash
   POST http://localhost:5000/api/auth/login
   Content-Type: application/json

   {
     "email": "john@example.com",
     "password": "password123"
   }
   ```

### Security Features

- **Password Hashing**: bcrypt with configurable salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Express-validator for request validation
- **CORS**: Configurable cross-origin resource sharing
- **Helmet**: Security headers for Express
- **Error Handling**: Comprehensive error responses

### Development

- Uses `nodemon` for automatic server restart during development
- Morgan logging in development mode
- Detailed error messages in development environment

### Production Considerations

- Set `NODE_ENV=production`
- Use a strong `JWT_SECRET`
- Configure proper `CORS_ORIGIN`
- Set up proper logging
- Use environment-specific MongoDB connection strings

### Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

### License

This project is licensed under the MIT License.
