# Blog backend API

**Production-ready REST API for the fullstack blog built with Express, PostgreSQL, and Prisma ORM.** Implements secure **JWT authentication** (access + refresh tokens in httpOnly cookies), **role-based access control**, and **image uploads**.

⚠️ _Please note: free Render server may take up to 1 minute to wake up on first request._

## 🔗 Quick Links

[**Swagger docs**](https://blog-backend-prisma-sv62.onrender.com/api-docs/) _(use `/auth/register` to get tokens)_

[**Frontend repository**](https://github.com/TatyanaZakiryanova/blog-frontend)

[**Frontend deployment**](https://blog-frontend-rho-bice.vercel.app/)

[**README на русском**](./README.ru.md)

## 🛠️ Technologies

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

## 💻 Features

### Authentication & Authorization

- User authentication and registration using **access and refresh tokens**:
  - access token is stored for 15 minutes
  - refresh token is stored for 7 days
- **httpOnly cookies** for storing refresh tokens
- **Role-based access control** with middleware checks. **Admin rights**:
  - Getting a list of all users with their roles
  - Deleting any user, post and comment
- Middleware for **route protection** (checkAuth, checkRole)

### CRUD & Database

- **CRUD** for posts and comments
- Validation for all input data using **Zod schemas**
- Strictly typed **DTOs**
- Atomic database operations using **Prisma transactions** (e.g. creating/deleting a comment and incrementing/decrementing the post's comment counter)

### Media

- Image uploads via **Multer + Cloudinary**: images for posts, user avatar

### Deployment & Docs

- **Swagger-based** API docs
- Hosted via **Render** (backend) + **Neon** (PostgreSQL)

## 📁 Architecture

```bash
prisma/
├── migrations/
├── schema.prisma
src/
├── config/
├── controllers/
├── dtos/
├── middlewares/
├── routes/
├── services/
├── swagger/
├── utils/
```

## 🪄 How to start project

clone the repository:

```bash
git clone
```

in the project directory, run:

```bash
npm install
```

create **.env** file with _.env.example_ in the root directory, then build the project:

```bash
npm run build
```

start the server:

```bash
npm start
```
