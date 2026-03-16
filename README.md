# 🛒 Ecommerce Frontend

![React](https://img.shields.io/badge/Frontend-React-blue)
![Bootstrap](https://img.shields.io/badge/UI-Bootstrap-purple)
![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow)
![Status](https://img.shields.io/badge/Project-Active-success)

A modern **Ecommerce Web Application Frontend** built using **React.js and Bootstrap**.  
This application allows users to browse products, manage carts, add items to wishlist, and place orders.

The frontend communicates with a **Spring Boot REST API backend**.

---

# 📌 Project Overview

This project is the **frontend layer of a full-stack ecommerce system**.

Users can:

- Register and login
- Browse products
- Add products to cart
- Manage wishlist
- Place orders
- Complete payments

The UI is built using **React components** and communicates with the backend using **Axios REST API calls**.

---

# 🧰 Tech Stack

| Technology | Purpose |
|------------|--------|
| React.js | Frontend Framework |
| React Router | Page Routing |
| Axios | API Communication |
| Bootstrap | Styling |
| JavaScript | Application Logic |
| HTML/CSS | UI Structure |

---

# ✨ Features

### 👤 User Features

- User Registration
- User Login
- Browse Products
- View Product Details
- Add Products to Cart
- Remove Products from Cart
- Wishlist Management
- Place Orders
- Razorpay Payment Integration

---

# 📂 Project Structure

```text
src
│
├── Components
│   ├── Navbar.js
│   ├── Footer.js
│
├── Pages
│   ├── Home.js
│   ├── Login.js
│   ├── Register.js
│   ├── Product.js
│   ├── Cart.js
│   ├── Wishlist.js
│
├── Services
│   ├── ProductService.js
│   ├── CartService.js
│   ├── UserService.js
│
├── App.js
└── index.js
