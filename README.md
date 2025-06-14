# 🏡 StayFinder - Airbnb Clone (Full Stack App)

StayFinder is a full-stack Airbnb clone built with **Next.js (App Router)**, **Tailwind CSS**, **NestJS**, **Prisma**, and **PostgreSQL**. It supports user authentication, listing creation, booking, admin dashboard, and more!

---

## 🚀 Live Demo

- Frontend: [https://stayfinder.vercel.app](https://stayfinder.vercel.app)
- Backend: [https://stayfinder-api.up.railway.app](https://stayfinder-api.up.railway.app) *(or your deployed backend URL)*

---

## 🛠 Tech Stack

### Frontend (App Folder)

- **Next.js 14+ (App Router)**
- **Tailwind CSS**
- **TypeScript**
- **React Hook Form**
- **Zod for validation**
- **JWT Auth (Client-Side)**

### Backend

- **NestJS**
- **Prisma ORM**
- **PostgreSQL**
- **JWT Authentication**
- **Role-Based Access Control**
- **REST API**

---

## 📦 Features

- 🔐 JWT Auth: Register, Login, Logout
- 🏠 Create and Manage Listings (Host)
- 📅 Booking System (Guest)
- 📊 Admin Dashboard for managing users, listings, and bookings
- ❤️ Favorites (Like listings)
- 🔍 Search & Filters (Location, Price)
- 🌐 Fully deployed on Vercel (Frontend) + Railway (Backend & DB)

---

## 🧑‍💻 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/stayfinder.git
cd stayfinder

### 2. Environment Setup
🌐 Backend (/backend)

    cd backend
    npm install

### Create .env file:
    DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
    JWT_SECRET=your_jwt_secret

### Run DB migration and start server:
    npx prisma migrate dev
    npm run start:dev

### 🌐 Frontend (/frontend)

    cd frontend
    npm install


###  Create .env.local:

    NEXT_PUBLIC_API_URL=http://localhost:3000


### Start frontend:
    npm run dev


### 🌍 Deployment Instructions
    Frontend (Netlify or Vercel)
    Push frontend to GitHub


    Set env: NEXT_PUBLIC_API_URL=https://your-backend-url

    Backend (Railway or Render)
    Push backend to GitHub


    Set env vars:

    DATABASE_URL

    JWT_SECRET

    Enable CORS for frontend


👥 Roles

    user: Can book listings

    host: Can create/manage listings

    admin: Has full access to dashboard


📷 Screenshots
    Add UI screenshots or demo GIFs !


🤝 Contributing
    PRs are welcome! Please open issues for suggestions or bugs.