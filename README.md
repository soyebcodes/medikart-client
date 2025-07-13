# 🏥 Multi-Vendor E-commerce Pharmacy (MediKart)

🔗 **[Visit Live Site](https://medikartt.netlify.app/)**

A full-stack multi-vendor pharmacy web application built using **MERN Stack**. The platform supports:

- 🛍️ Buyers to browse and purchase medicines
- 🧑‍💼 Sellers to upload, manage, and advertise medicines
- 🧑‍💻 Admins to manage users, orders, and site content

This project features authentication, role-based dashboards, payment processing via Stripe, dynamic search/filtering, and responsive UI using **Tailwind CSS + DaisyUI**, State Management with Zustand.

---

## 🚀 Tech Stack

| Frontend               | Backend                    | Other Tools        |
| ---------------------- | -------------------------- | ------------------ |
| React + React Router   | Node.js + Express.js       | Stripe Integration |
| Tailwind CSS + DaisyUI | MongoDB + Mongoose         | React Query        |
| Axios, Zustand         | JWT Auth & Role Protection | Framer Motion      |

---

## 📁 Features

### 🌐 Public (Unauthenticated)

- Home page with featured sections (new arrivals, categories, testimonials)
- Shop page with table view of all medicines
- Modal to view medicine details
- Add-to-cart functionality
- Category-wise filtering
- Search, sorting, and pagination

### 👤 Authentication

- Register/Login (JWT-based)
- Role-based redirection: User, Seller, Admin

### 👤 User Dashboard

- View payment history
- Responsive sidebar navigation
- Checkout with Stripe payment

### 🧑‍💼 Seller Dashboard

- Add/edit/delete medicines
- View their products and sales
- Advertise selected medicines

### 🛠️ Admin Dashboard

- Manage users (change roles)
- View all medicines
- View platform-wide transactions

---

## 🔧 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/soyebcodes/medikart-server.git
cd medikart-client
```
