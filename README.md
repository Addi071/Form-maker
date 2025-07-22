# 📝 Form Maker Website

A full-stack Form Maker web application that allows users to create customizable forms, share them via links, and view collected responses. Designed for surveys, feedback collection, and data analysis. 

---

## 🚀 Features

- 🔐 User Authentication (Admin login)
- 🧾 Create dynamic survey forms with:
  - Text input
  - Radio buttons
  - Checkboxes
  - File uploads
- 🔗 Share form via unique link
- 📥 Collect user responses
- 📊 Admin dashboard:
  - View number of forms created
  - View responses per form
- 🗂️ MongoDB-based storage for forms & responses
- 📅 Tracks submission time (`createdAt` timestamp)

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- Bootstrap
- React Router

### Backend:
- Node.js
- Express.js
- MongoDB + Mongoose

### Additional:
- Multer (for file uploads)
- GridFS (for storing uploaded files in MongoDB)
- JWT / Session (for admin auth, if implemented)
- Mongo db

---
