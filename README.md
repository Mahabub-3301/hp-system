# 🚀 HP System

<p align="center">
  <b>Full Stack Application for Student, Teacher & Cohort Management</b><br/>
  Built with <b>Node.js • Express • TypeScript • MongoDB • React</b>
</p>

---

## 👨‍💻 Authors

* **Shaik Rehan Ur Rahman**
* **Shaik Mahaboob Basha**

---

## 🔗 Repository

👉 https://github.com/shaikrehansr9/hp-system/tree/main
👉 https://github.com/Mahabub-3301/hp-system/tree/main

---

## ✨ Features

* 👤 Student Registration
* 👨‍🏫 Teacher Registration
* 🔐 Login with JWT Authentication
* 🔒 Password hashing using bcrypt
* 🎭 Role-based system (Student / Teacher)
* 📊 Student data management
* 🧑‍🤝‍🧑 Cohort with teacher & students
* 🛡️ Protected routes using token

---

## 🛠️ Tech Stack

### ⚙️ Backend

* Node.js
* Express.js
* TypeScript
* MongoDB (Mongoose)
* JWT
* bcrypt

### 🎨 Frontend

* React
* TypeScript

---

## 📁 Project Structure

### 📦 Backend

```
backend/src/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── app.ts
└── index.ts
```

### 💻 Frontend

```
frontend/src/
├── components/
└── pages/
```

---

## ⚙️ Setup Instructions

### 🔽 1. Clone Repository

```
git clone https://github.com/shaikrehansr9/hp-system.git
cd hp-system
```

---

### 🔧 2. Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```
npm run dev
```

---

### 🌐 3. Frontend Setup

```
cd frontend
npm install
npm start
```

---

## 🔌 API Endpoints

### 🔐 Authentication

* POST `/register`
* GET `/login`

---

### 🎓 Student

* GET `/api/students`
* GET `/api/students/:id`
* POST `/api/students`

---

### 👨‍🏫 Teacher

* Routes under `/teacher`

---

## 🔄 Authentication Flow

1. User registers (Student / Teacher)
2. Password is hashed using bcrypt
3. User logs in
4. JWT token is generated
5. Token stored in localStorage
6. Protected pages verify token

---

## 🗄️ Database Models

### 🎓 Student

* name
* email
* passwordHash
* role
* baseHP
* currentHP
* cohorts

---

### 👨‍🏫 Teacher

* name
* email
* passwordHash
* role
* cohorts

---

### 🧑‍🤝‍🧑 Cohort

* name
* teacher
* students
* BaseHp

---

## ▶️ Running the Project

1. Start backend server
2. Start frontend server
3. Open browser
4. Register or login
5. Access dashboard

---

<p align="center">
  ⭐ If you found this project useful, consider giving it a star!
</p>
