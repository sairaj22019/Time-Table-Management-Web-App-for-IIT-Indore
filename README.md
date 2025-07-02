# 🗓️ College Timetable Management System

A full-stack **Timetable Management App** designed to replace the cluttered Excel-based system currently used in college administration. This application streamlines course scheduling, communication, and student-professor interactions through an intuitive web interface.

---

## 🔍 Project Overview

The Timetable Management System is a web-based application developed to simplify and modernize the process of timetable handling for students, professors, and administrators. The existing system relied heavily on static Excel sheets, causing issues like redundancy, lack of role-based views, and complex scheduling. This app addresses those limitations with dynamic features such as:

- **Role-based course viewing and editing**
- **Real-time messaging and polling**
- **Secure login with Google OAuth 2.0**
- **Robust backend with form validation**
- **Smart slot-based course allocation**

---

## 🚀 Tech Stack

| Technology        | Description                            |
|------------------|----------------------------------------|
| Next.js          | Full-stack React framework (Frontend + API) |
| MongoDB          | NoSQL database for dynamic data storage |
| Mongoose         | ODM for MongoDB                        |
| Zod              | Schema validation for form handling     |
| Google OAuth 2.0 | Secure authentication system            |
| Tailwind CSS     | Utility-first CSS for responsive design |

---

## ✅ Features

### 🔐 Authentication
- Traditional email/password login
- Google OAuth 2.0 integration

### 👥 Role-Based Access
- Students: View personalized schedule and courses
- Professors: View, message students, and send polls *(frontend done)*
- Admins: Full control — add/edit/delete courses, manage users

### 📅 Course Management
- Dynamic course creation forms based on year and slot system:
  - **Year 1**: Time-based slots
  - **Year 2 and above**: Slot-based timetable system
- Backend validation via Zod for all course and user forms
- Linked database with proper models for students, professors, and courses

### 🔧 Admin Panel
- Add, edit, and delete courses
- Access all user data and their schedules

### 📬 Communication
- Professors can send messages and conduct polls
- Notifications backend 50% implemented (coming soon)

---

## 💻 Run the Project Locally

Follow these step-by-step instructions to run and view the project on your local machine.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/timetable-management-app.git
cd timetable-management-app