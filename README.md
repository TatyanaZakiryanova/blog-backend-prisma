# Blog backend API

RESTful API for the blog project, built with Express and TypeScript.

[README на русском](./README.ru.md)

[API documentation](https://blog-backend-prisma-sv62.onrender.com/api-docs/)

[Frontend repository for this API](https://github.com/TatyanaZakiryanova/blog-frontend)

[Frontend deployment for this API](https://blogaboutit.netlify.app/)

## Technologies

- **Node.js + Express**
- **TypeScript**
- **PostgreSQL** (via Prisma ORM)
- **JWT** – authentication and authorization
- **bcrypt** – password hashing
- **Multer + Cloudinary** – image uploading (images for posts, user avatar)
- **CORS, dotenv** – environment configuration
- **Zod** – runtime schema validation and DTO enforcement
- **Neon, Render** – deployment
- **Swagger** – API documentation

## Features

- User authentication and registration using **access and refresh tokens**:
  - access token is stored for 15 minutes
  - refresh token is stored for 7 days
- **httpOnly secure cookies** for storing refresh tokens
- **Role-based access control** with middleware checks. **Admin rights**:
  - Getting a list of all users with their roles
  - Deleting any user, post and comment
- Middleware for **route protection** (checkAuth, checkRole). Unauthorized users cannot write posts and comments
- Centralized error handling (errorHandler)
- Validation of all incoming data using **Zod schemas**
- Strictly typed DTOs
- Atomic database operations using **Prisma transactions** (e.g. creating/deleting a comment and incrementing/decrementing the post's comment counter)
- **CRUD operations** for posts and comments
- Image upload to **Cloudinary**: images for posts, user avatar
- **Pagination** for posts
- **Swagger-based** API docs

## How to start project

in the project directory, run:

```bash
npm install
```

create .env file in the root directory, then build the project:

```bash
npm run build
```

start the server:

```bash
npm start
```
