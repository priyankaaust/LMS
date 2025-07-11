# 📚 Library Management System – User Stories & Use Cases

## 🎯 Identified User Roles

| Role         | Description                                                                 |
|--------------|-----------------------------------------------------------------------------|
| **Admin**    | Manages users, roles, and system-wide configurations.                       |
| **Librarian**| Manages books, handles lending/return, and runs reports.                    |
| **Member**   | Registered library user who borrows, searches, and reads digital content.   |

---

## 🔑 Key User Stories

### 1. Admin – User Management

**Story**  
As an Admin, I want to register users and assign roles so that each user has appropriate access rights.

**Acceptance Criteria**
- Admin can create user accounts.
- Admin can assign or change roles (Member, Librarian).
- Only Admins have access to role management.

---

### 2. Librarian – Book Management

**Story**  
As a Librarian, I want to add, edit, and delete books so that the catalog stays accurate and updated.

**Acceptance Criteria**
- Librarian can add books with metadata (ISBN, author, genre).
- Librarian can upload cover images and digital files.
- Librarian can edit and delete existing books.

---

### 3. Librarian & Member – Lending System

**Story**  
As a Librarian, I want to issue and return books so that I can track lending.  
As a Member, I want to borrow and return books so that I can enjoy library materials.

**Acceptance Criteria**
- Librarian can issue books to users and record returns.
- System calculates overdue fines automatically.
- Members can view their borrowing status and history.

---

### 4. Member – Reservation System

**Story**  
As a Member, I want to reserve unavailable books and receive notifications so that I can borrow popular items as soon as possible.

**Acceptance Criteria**
- Members can place reservations on checked-out books.
- System sends notification when reserved books are available.
- Reservations expire automatically if not collected in a set time.
