# 📌 Office Registration Management System – 3 Tier Architecture

This is a fully functional **Office Registration Management System** developed using a clean **3-tier architecture** approach. It features role-based access for **HR** and **Employees**, with dynamic, real-time data interactions powered by **Knockout.js**. The architecture separates concerns for better maintainability, scalability, and testability.

---

## 🧱 Architecture

- **UI Layer**: ASP.NET Web Forms + Knockout.js (MVVM binding)
- **Business Logic Layer**: WCF Services using DTOs
- **Data Access Layer**: MySQL with stored procedures

---

## 👥 User Roles

### HR
- Login securely
- View & approve/reject pending employees
- Manage departments (Add/Delete)
- Edit/Delete employee details
- Access HR dashboard

### Employee
- Register with basic info & department preference
- Await approval
- Post-approval login & profile management

---

## 🚀 Tech Stack

- ASP.NET Web Forms
- WCF Service Layer
- MySQL (with Stored Procedures)
- Knockout.js
- JavaScript, AJAX

---

## ✅ Benefits of 3-Tier vs Non-Tier

| Feature               | Without 3-Tier       | With 3-Tier                   |
|----------------------|----------------------|-------------------------------|
| Maintainability      | ❌ Hard to manage     | ✅ Easier to maintain         |
| Scalability          | ❌ Limited            | ✅ Easy to scale              |
| Reusability          | ❌ Tightly coupled    | ✅ Business logic reusable    |
| Testing              | ❌ Difficult to test  | ✅ Service layer can be tested|
| UI Responsiveness    | ❌ Static             | ✅ Live updates via KO.js     |

---

## 🙋‍♂️ About Me

I’m currently working as an **intern at Vegam Solutions**, where I’m gaining practical experience in full-stack development. This project was built to strengthen my understanding of scalable architecture, clean code practices, and integration of modern tools like **Knockout.js** with ASP.NET and WCF services.

---

## 📦 Status

✅ Fully Completed  
🧩 Designed for real-time interaction  
📁 Modular for future extension

