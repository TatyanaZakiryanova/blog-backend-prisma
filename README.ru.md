# Blog backend API

**REST API для fullstack-блога на Express, PostgreSQL и TypeScript.** Включает **JWT аутентификацию** (access + refresh token в httpOnly cookies), **RBAC**, загрузку аватаров и изображений к постам через **Cloudinary**.

⚠️ _Первая загрузка сервера на Render может занять до 1 минуты. Пожалуйста, подождите_

## 🔗 Quick Links

[**Swagger docs**](https://blog-backend-prisma-sv62.onrender.com/api-docs/) _(use `/auth/register` to get tokens)_

[**Frontend repository**](https://github.com/TatyanaZakiryanova/blog-frontend)

[**Frontend deployment**](https://blog-frontend-rho-bice.vercel.app/)

## 🛠️ Technologies

- **Node.js + Express**
- **TypeScript**
- **PostgreSQL** (Prisma ORM)
- **JWT** – аутентификация и авторизация
- **bcrypt** – хэширование паролей
- **Multer + Cloudinary** – загрузка изображений (изображения к постам, аватары пользователей)
- **CORS, dotenv** – настройка окружения
- **Zod** – валидация входящих данных
- **Neon, Render** – деплой
- **Swagger** – документация

## 💻 Features

### Authentication & Authorization

- Аутентификация и регистрация пользователей с использованием **access token и refresh token**:
  - access token хранится 15 минут
  - refresh token хранится 7 дней
- refresh токены хранятся в **httpOnly cookies**
- **Управление доступом на основе ролей** через checkRole middleware. **Права админа**:
  - Получение списка всех юзеров с указанием ролей
  - Удаление любого юзера, поста и комментария
- **Middlewares для защиты маршрутов** (checkAuth, checkRole)

### CRUD & Database

- **CRUD** для постов и комментариев
- Проверка всех входящих данных с использованием **схем Zod**
- Строго типизированные **DTO**
- Атомарные операции с БД с использованием **транзакций Prisma** (increment/decrement счётчика комментариев поста при создании/удалении комментария)

### Мedia

- Загрузка изображений через **Multer + Cloudinary** (изображения к постам, аватары пользователей)

### Deployment & Docs

- **Swagger** документация
- Деплой бэкенда - **Render**, деплой PostgreSQL базы - **Neon**

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
