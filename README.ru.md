# Blog backend API

RESTful API для блога на Express и TypeScript.

[Документация API](https://blog-backend-prisma-sv62.onrender.com/api-docs/)

[Frontend для этого API](https://blogaboutit.netlify.app/)

## Technologies

- Node.js + Express
- TypeScript
- PostgreSQL (Prisma ORM)
- JWT – аутентификация и авторизация
- bcrypt – хэширование паролей
- Multer + Cloudinary – загрузка изображений
- CORS, dotenv – настройка окружения
- Zod – валидация входящих данных в рантайме
- Neon, Render – деплой
- Swagger – документация

## Features

- Аутентификация и регистрация пользователей с использованием access token и refresh token
- refresh токены хранятся в httpOnly cookies
- Управление доступом на основе ролей через checkRole middleware
- Middlewares для защиты маршрутов (checkAuth, checkRole)
- Централизованная обработка ошибок
- Проверка всех входящих данных с использованием схем Zod
- Строго типизированные DTO
- Атомарные операции с БД с использованием транзакций Prisma
- CRUD для постов и комментариев
- Загрузка изображений в Cloudinary
- Swagger документация

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
