# **School Management System (SCHMS)**

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express.js-Backend-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
![Vite](https://img.shields.io/badge/Vite-Frontend-yellow)
![React](https://img.shields.io/badge/React-18+-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styling-38B2AC)
![Redux](https://img.shields.io/badge/Redux-State--Management-purple)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

A full-stack **School Management System** built using **Express.js**, **MongoDB**, and **JWT Authentication**, with a modern **Vite + React + TailwindCSS** frontend enhanced by **Flowbite** and **React Redux**.

The system supports student management, staff management, events, fee structures, user accounts, and invite flows.

---

## 🚀 **Tech Stack**

### **Backend**
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- Multer (file uploads)  
- Node.js  

### **Frontend**
- Vite  
- React  
- TailwindCSS  
- Flowbite  
- React Redux  

---

## 📦 **Features**

### **Backend**
- Secure JWT authentication  
- CRUD APIs for:
  - Students  
  - Staff  
  - Users  
  - Events  
  - Fee Structures  
  - Invites  
- Protected routes with middleware  
- Image/file upload support  
- Organized MVC pattern  
- Global error handling  

### **Frontend**
- Clean, responsive UI (TailwindCSS + Flowbite)  
- Redux-driven authentication and state management  
- Protected routes using `PrivateRoute`  
- Student & staff registration  
- Fee structure creation / updates  
- Event management tools  
- Admin features: finance, classes, profiles, and more  
- Reusable component architecture  

---

## 📁 **Project Structure**

### **Root**
schms/
├─ api/ # Backend
├─ client/ # Frontend
├─ uploads/ # Uploaded files


---

### **Backend (`/api`)**


api
├─ controllers
├─ models
├─ routes
├─ utils
└─ index.js