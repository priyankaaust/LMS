# 📘 Unit Testing Plan – Library Management System

## 🧪 Purpose

This document outlines the strategy and scope for unit testing the **Library Management System (LMS)** to ensure correct behavior of both backend and frontend components and support future maintenance.

---

## 🛠️ Tools & Frameworks

### Backend (Node.js, Express, MongoDB)

- **Testing Framework:** [Jest](https://jestjs.io/)
- **HTTP Testing:** [Supertest](https://github.com/visionmedia/supertest)
- **Mock DB:** [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server)
- **Mocking:** `jest.mock`

### Frontend (React)

- **Testing Library:** [React Testing Library](https://testing-library.com/)
- **Test Runner:** Jest (included in CRA)
- **Mocking:** `jest.fn()`, [MSW](https://mswjs.io/)

---

## 🔍 Scope of Unit Tests

### 1. Backend Unit Tests

| Component                                      | Test Cases                                                                              |
| ---------------------------------------------- | --------------------------------------------------------------------------------------- |
| 🔐 **Authentication** (`authController.js`)    | ✅ Successful login/registration✅ JWT token issued✅ Invalid credentials handled          |
| 📚 **Books API** (`bookRoutes.js`)             | ✅ Create book with files✅ Get all books✅ Input validations                              |
| 🔁 **Lending Logic** (`LendingTransaction.js`) | ✅ Issue updates availability✅ Return updates and calculates fine✅ Prevent double return |
| 📋 **Loan Routes** (`loanroutes.js`)           | ✅ Issue and return flows✅ Member loan history✅ Auth-protected endpoints                 |
| 👥 **User Management** (`auth.routes.js`)      | ✅ Get user list✅ Toggle role                                            |

### 2. Frontend Unit Tests

| Component          | Test Cases                                                             |
| ------------------ | ---------------------------------------------------------------------- |
| 🔐 `Login.js`      | ✅ Input check✅ API call and error handling                             |
| 📚 `UserBooks.js`  | ✅ Displays books✅ Borrow action works✅ Handles no copies               |
| 📊 `Loans.js`      | ✅ Loan list loads✅ Status & fine displayed✅ Filters function correctly |
| 📆 `AdminUsers.js` | ✅ Display users✅ Delete/reset/role actions work                        |

---

## 📁 Suggested Test File Structure

```
LMS/
├── backend/
│   ├── tests/
│   │   ├── auth.test.js
│   │   ├── books.test.js
│   │   ├── lending.test.js
│   │   ├── loans.test.js
│   │   └── users.test.js
├── frontend/
│   └── src/
│       ├── __tests__/
│       │   ├── Login.test.js
│       │   ├── UserBooks.test.js
│       │   ├── AdminUsers.test.js
│       │   └── Loans.test.js
```

---

## 🚀 How to Run Tests

### Backend

```bash
cd backend
npm install
npm test
```

To check coverage:

```bash
npm test -- --coverage
```

### Frontend

##  Setup for Frontend Testing

npm install --save-dev @testing-library/react @testing-library/jest-dom jest

```bash
cd frontend
npm install
npm test
```

To run once:

```bash
npm test -- --watchAll=false
```

---

## 🌟 Goals

- Catch bugs early
- Validate key logic
- Simplify refactoring
- Improve team confidence
- Maintain a healthy codebase

---

## 📎 References

- [Jest Docs](https://jestjs.io/docs/getting-started)
- [Supertest](https://github.com/visionmedia/supertest)
- [Testing Library](https://testing-library.com/)
- [MSW](https://mswjs.io/)

---