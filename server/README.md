# Zoo Management Backend – Setup Guide

This guide will help you run the project locally with **Node.js + Express + Prisma + PostgreSQL (Docker)**.

---

## 1 Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker & Docker Compose](https://docs.docker.com/get-docker/)
- [npm](https://www.npmjs.com/)

---

## 2 Install Dependencies

```bash
npm install
```

---

## 3 Setup Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://zoo_admin:zoo_password@localhost:5432/zoo_db?schema=public"
JWT_SECRET="your_secret_key_here"
PORT=4000
```

---

## 4 Run PostgreSQL with Docker

Start the DB container:

```bash
docker-compose up -d
```

Check if the container is running:

```bash
docker ps
```

---

## 5 Run Database Migrations

Generate the Prisma client and apply migrations:

```bash
npx prisma migrate dev
```

---

## 6 Seed the Database (default admin + test data)

Run the Prisma seed script:

```bash
npx prisma db seed
```

This will insert:

- 1 Admin user
- Sample animals, enclosures, staff, feeding, and health records

---

## 7 Start the Development Server

```bash
npm run dev
```

Server should now be running at:

```
http://localhost:4000
```

---

## Helpful Commands

- View database in terminal:
  ```bash
  docker exec -it zoo-db psql -U zoo_admin -d zoo_db
  ```
- Open Prisma Studio (GUI for DB):
  ```bash
  npx prisma studio
  ```

---
