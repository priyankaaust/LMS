# Class: User
- userId: String
- name: String
- email: String
- passwordHash: String
- role: Enum {Admin, Librarian, Member}
- register()
- login()
- logout()

# Class: Book
- bookId: String
- title: String
- isbn: String
- author: String
- genre: String
- coverImageUrl: String
- digitalFileUrl: String
- totalCopies: Number
- availableCopies: Number
- addBook()
- editBook()
- deleteBook()

# Class: LendingTransaction
- transactionId: String
- book: Book
- user: User
- issueDate: Date
- dueDate: Date
- returnDate: Date
- fineAmount: Decimal
- issueBook()
- returnBook()
- calculateFine()

# Class: Reservation
- reservationId: String
- book: Book
- user: User
- reservationDate: Date
- expiryDate: Date
- notifyUser()
- cancelReservation()

# Class: Notification
- notificationId: String
- user: User
- message: String
- dateSent: Date
- send()

# sRelationships:
- User "1" --- "many" LendingTransaction (A user can have many lending transactions)
- Book "1" --- "many" LendingTransaction (A book can be lent many times)
- User "1" --- "many" Reservation (A user can have many reservations)
- Book "1" --- "many" Reservation (A book can have many reservations)
- User "1" --- "many" Notification (A user can receive many notifications)
