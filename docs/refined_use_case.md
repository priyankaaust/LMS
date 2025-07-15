# 📚 Library Management System – User Stories & Use Cases

## 🎯 Identified User Roles

| Role         | Description                                                                 |
|--------------|-----------------------------------------------------------------------------|
| **Library Admin**    | Manages users, roles, books, lending transactions.             |
| **Member**   | Registered library user who can browse, borrow, return, and reserve books.  |

---

## 🔑 Key User Stories

### 1. Library Admin – User & Role Management

**Story**  
As a Library Admin, I want to register users and assign roles so that they can access appropriate features based on their responsibilities.

**Acceptance Criteria**
- Library Admin can create new users by providing a username, password, and role.
- Library Admin can view all users.
- Library Admin can update a user’s role (e.g., promote to admin).
- Library Admin can delete users if needed.
- Role-based access is enforced (only Admin can manage users).

---

### 2. Library Admin – Book Management

**Story**  
As an Library Admin, I want to add, update, and delete books including images and files so that the catalog stays accurate and rich in content.

**Acceptance Criteria**
- Library Admin can add books with fields like `title`, `ISBN`, `author`, `genre`, and `totalCopies`.
- Library Admin can upload cover images and digital content (e.g., PDFs).
- Library Admin can edit or delete books.
- System handles optional fields gracefully (e.g., null images).
- Books can be fetched and listed via API.

---

### 3. Member & Library Admin – Borrow & Return Books

**Story**  
As a Member, I want to borrow and return books so I can enjoy library materials and avoid overdue penalties.  
As an Library Admin, I want to view all lending records and return books on behalf of members so I can manage library activity efficiently.

**Acceptance Criteria**
- Members can borrow available books.
- Members can return books themselves.
- System tracks `issueDate`, `dueDate`, `returnDate`, and calculates fines automatically for overdue returns.
- Members can view their loan history and current status.
- Library Admin can view all lending transactions with filters (e.g., by user or status).
- Library Admin can return books on behalf of users.


---

## 🚧 Planned/Upcoming

### 4. Member – Reservation System *(Planned)*

**Story**  
As a Member, I want to reserve checked-out books and get notified when they are available so I don’t miss high-demand titles.

**Acceptance Criteria**
- Members can place reservations for currently borrowed books.
- System sends notification (email/alert) when a reserved book becomes available.
- Reservation auto-expires if the book is not picked up within a time window.
- Admin sees reservation queues and statuses.

---

