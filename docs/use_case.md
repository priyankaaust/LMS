# 📚 Library Management System – User Stories & Use Cases

## 🎯 Identified User Roles

| Role         | Description                                                                 |
|--------------|-----------------------------------------------------------------------------|
| **Admin**    | Manages users, roles, and system-wide configurations.                       |
| **Librarian**| Manages books, handles lending/return, and runs reports.                    |
| **Member**   | Registered library user who borrows, searches, and reads digital content.   |
| **Guest**    | Unauthenticated user with access to public catalog and chatbot help.        |
| **System**   | Automated background processes like sending reminders, generating reports.  |
| **Developer**| Accesses REST API for external integration.                                 |

---

## ✅ User Stories with INVEST & Acceptance Criteria

### 3.1 Book Management
**Story**: As a Librarian, I want to add, edit, and delete books so that I can maintain an up-to-date catalog.

- **INVEST**: ✅ Independent, Negotiable, Valuable, Estimable, Small, Testable  
- **Acceptance Criteria**:
  - Can create a book with ISBN, title, genre, and author.
  - Can upload cover and digital file.
  - Can edit and delete an existing book.

---

### 3.2 User Management
**Story**: As an Admin, I want to register users and assign them roles so they have the correct access.

- **INVEST**: ✅  
- **Acceptance Criteria**:
  - New users can register with email and password.
  - Admin can change roles (Member ↔ Librarian).
  - Only Admin has access to role assignment.

---

### 3.3 Lending System
**Story**: As a Librarian, I want to issue and return books so that I can track lending activity.

- **INVEST**: ✅  
- **Acceptance Criteria**:
  - Can select a book and member to issue.
  - Can return a book and record return date.
  - Fine is calculated if overdue.

---

### 3.4 Reservation System
**Story**: As a Member, I want to reserve an unavailable book so that I get notified when it's available.

- **INVEST**: ✅  
- **Acceptance Criteria**:
  - Member can reserve a book if currently checked out.
  - System sends notification when book is returned.
  - Reservation expires in X days if not collected.

---

### 3.5 Search & OPAC
**Story**: As a Guest, I want to search the public catalog so that I can see what the library offers.

- **INVEST**: ✅  
- **Acceptance Criteria**:
  - Search by title, author, ISBN, or genre.
  - Returns list with cover and availability.
  - Semantic search shows contextual matches.

---

### 3.6 Digital Library
**Story**: As a Member, I want to download digital content so that I can read books online.

- **INVEST**: ✅  
- **Acceptance Criteria**:
  - Member can browse digital library.
  - Downloads are available for authorized users only.
  - File preview (e.g. PDF reader) is available.

---

### 3.7 AI Recommendations
**Story**: As a Member, I want to receive book suggestions so that I can discover new books easily.

- **INVEST**: ✅  
- **Acceptance Criteria**:
  - Personalized suggestions appear on dashboard.
  - Trending and similar books shown by genre.

---

### 3.8 Reports & Analytics
**Story**: As an Admin, I want to view library usage reports so I can make informed decisions.

- **INVEST**: ✅  
- **Acceptance Criteria**:
  - Inventory and lending statistics are viewable.
  - Graphical charts show monthly trends.

---

### 3.9 QR/Barcode Scanning
**Story**: As a Librarian, I want to scan book barcodes to issue or return books efficiently.

- **INVEST**: ✅  
- **Acceptance Criteria**:
  - Scanning auto-fills book info.
  - Works on both desktop and mobile.

---

### 3.10 Multilingual Interface
**Story**: As a User, I want to select a language at login so I can use the system in my preferred language.

- **INVEST**: ✅  
- **Acceptance Criteria**:
  - Language selector available on login.
  - UI updates to selected language.
  - At least 3 languages supported.

---

### 3.11 API Access
**Story**: As a Developer, I want RESTful API access with token authentication to integrate with external apps.

- **INVEST**: ✅  
- **Acceptance Criteria**:
  - Token-based auth required.
  - Can perform GET/POST/PUT for books, users, lending, etc.

---

### 3.12 Smart Acquisition Suggestions
**Story**: As a Librarian, I want book acquisition suggestions based on demand so I can stock popular titles.

- **INVEST**: ✅  
- **Acceptance Criteria**:
  - Suggested books listed with source (e.g. Amazon).
  - Data based on circulation stats.

---

### 3.13 AI Chatbot Assistant
**Story**: As a Guest or Member, I want to ask the chatbot questions so I can get help quickly.

- **INVEST**: ✅  
- **Acceptance Criteria**:
  - Chatbot can search books, answer hours, policies.
  - Available on both web and mobile.

---

### 3.14 Learning Pathways & Reading Challenges
**Story**: As a Member, I want curated reading lists and challenges so I can stay motivated to read.

- **INVEST**: ✅  
- **Acceptance Criteria**:
  - Members can join challenges.
  - Progress tracked and badges awarded.

---

### 3.15 Self-Service Kiosk Integration
**Story**: As a Member, I want to check out books using a self-service kiosk so I can avoid waiting in line.

- **INVEST**: ✅  
- **Acceptance Criteria**:
  - Kiosk syncs with inventory in real-time.
  - Member authentication via card/ID.
  - Books updated in backend after kiosk transaction.

---

## 📌 Summary Table of Roles and Key Features

| Feature                        | Admin | Librarian | Member | Guest | System | Dev |
|-------------------------------|:-----:|:---------:|:------:|:-----:|:------:|:---:|
| Book Management               | ✔     | ✔         |        |       |        |     |
| User Management               | ✔     |           | ✔      |       |        |     |
| Lending System                |       | ✔         | ✔      |       | ✔      |     |
| Reservation System            |       |           | ✔      |       | ✔      |     |
| Search & OPAC                 |       | ✔         | ✔      | ✔     |        |     |
| Digital Library               |       | ✔         | ✔      |       |        |     |
| AI Recommendations            |       |           | ✔      |       | ✔      |     |
| Reports & Analytics           | ✔     | ✔         |        |       | ✔      |     |
| QR/Barcode Scanning           |       | ✔         | ✔      |       |        |     |
| Multilingual Interface        | ✔     | ✔         | ✔      | ✔     |        |     |
| API Access                    | ✔     |           |        |       |        | ✔   |
| Smart Acquisition Suggestions | ✔     | ✔         |        |       | ✔      |     |
| AI Chatbot Assistant          |       |           | ✔      | ✔     | ✔      |     |
| Learning Pathways             |       |           | ✔      |       |        |     |
| Kiosk Integration             | ✔     |           | ✔      |       | ✔      |     |
