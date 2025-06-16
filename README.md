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
- **Multer + Cloudinary** – image uploading
- **CORS, dotenv** – environment configuration
- **Zod** – runtime schema validation and DTO enforcement
- **Neon, Render** – deployment
- **Swagger** – API documentation

## Features

- User authentication and registration using **access and refresh tokens**
- **httpOnly secure cookies** for storing refresh tokens
- **Role-based access control** with middleware checks
- Middleware for **route protection** (checkAuth, checkRole)
- Centralized error handling (errorHandler)
- Validation of all incoming data using **Zod schemas**
- Strictly typed DTOs
- Atomic database operations using **Prisma transactions**
- **CRUD operations** for posts and comments
- Image upload to **Cloudinary**
- Swagger-based API docs

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
