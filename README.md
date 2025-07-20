# LMS
# Project Proposal: Library Management System Using UML Design 
# Members: Priyanka Saha, Sifat Sabrina Rahman 
### 1. Introduction 
Modern libraries require robust software to track books, patrons, loans, and fines. A well
designed Library Management System (LMS) improves efficiency, reduces errors, and 
provides better user services. This project will demonstrate how UML modeling can drive 
both design clarity mostly and code generation. 
### 2. Objectives 
1. Capture requirements using UML Use Case and Activity diagrams. 
2. Design system structure via UML Class and Component diagrams. 
3. Model dynamic behavior with Sequence and State Machine diagrams. 
4. Generate skeleton code from Class diagrams using a UML tool. 
5. Deliver a small prototype supporting book catalog, member management, and 
loan processing. 
### 3. Scope – In scope: 
• Book catalog management (add/update/remove/search) 
• Member registration and profile management 
• Loan and return workflows, including due date and fine calculation 
• Reporting: overdue items list, inventory summary – Out of scope: 
• Online reservation/payment gateways 
• Deep analytics (recommendation engine) 
### 4. Process: 
1. Draft high-level Use Case and Activity diagrams. 
2. Refine domain model in Class diagrams, assign attributes & operations. 
3. Model key scenarios (e.g., loan processing) with Sequence diagrams. 
4. Validate behavior with State Machine diagrams for Loan objects. 
5. Generate Java/Python code skeletons from Class diagrams. 
6. Implement core CRUD operations and simple console/UI views. 

### 5. Development Preference:
1. Backend (Express.js + MongoDB)
2. Frontend React
3. RESTful API
4. JWT Authentication




# 📚 Library Management System (Deployment Details)

A full-stack Library Management System built with **Express.js**, **React.js**, and **MongoDB**.

---

## 🚀 Getting Started

### 📦 Clone the Repository

```bash
git clone https://github.com/priyankaaust/LMS.git
cd lms
```

---

## ⚙️ Backend Setup

### 📁 Location: `/backend`

### 🛠️ Installation

```bash
cd backend
npm install
```

### ▶️ Run Backend

```bash
npm run dev
```

---

## 💻 Frontend Setup

### 📁 Location: `/frontend`

### 🛠️ Installation

```bash
cd ../frontend
npm install
```

### ▶️ Run Frontend

```bash
npm start
```

---

## 🧪 Running Tests

### ✅ Unit Tests

Run backend unit tests (if configured):

```bash
cd ../backend
npm test
```

### 🧩 System Tests (Cypress E2E)

```bash
cd ../frontend
npx cypress open
```

Or to run in CLI:

```bash
npx cypress run
```

Tests cover:
- User login
- Book borrow/return
- Loan list validation

---

### System Testing video
https://www.loom.com/share/d5b8f7090e8f4120a4427d91e1acc9d7?sid=f9eaab5e-178f-42b0-b9b4-d05bbf7905aa


## 📬 Feedback

Feel free to fork and contribute. Pull requests are welcome!

