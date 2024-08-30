import { Book } from "./models/Book";
import { ILibrary } from "./models/ILibrary";
import { IAdmin, IUser } from "./models/IUser";

export class LibrarySystem implements ILibrary, IAdmin {
    public books: Book[] = [];
    public users: IUser[] = [];
    public booksIssuedToUser: { [key: number]: number } = {}; // Dictionary to keep track of books issued to each user

    public addBook(title: string, author: string, bookId: number): void {
        const existingBook = this.books.find(book => book.bookId === bookId);

        if (existingBook) {
            existingBook.quantity++;
            console.log(`Quantity of '${existingBook.title}' by ${existingBook.author} increased to ${existingBook.quantity}.`);
        } else {
            const newBook = new Book(title, author, bookId);
            this.books.push(newBook);
            console.log(`Book '${title}' by ${author} added to the library.`);
        }
    }

    public removeBook(bookId: number): void {
        const book = this.books.find(book => book.bookId === bookId);

        if (book) {
            if (book.quantity > 1) {
                // If there's more than one copy, decrease the quantity
                book.quantity--;
                console.log(`Quantity of '${book.title}' by ${book.author} decreased to ${book.quantity}.`);
            } else {
                // If it's the last copy, remove the book from the library
                const index = this.books.indexOf(book);
                this.books.splice(index, 1);
                console.log(`Book '${book.title}' removed from the library. (ID: ${bookId})`);
            }
        } else {
            console.log(`Book with ID ${bookId} not found in the library.`);
        }
    }

    public listBooks(): void {
        if (this.books.length === 0) {
            console.log("No books available in the library.");
        } else {
            console.log("Available books in the library:");

            // Create an array to store unique book entries with quantities
            const uniqueBooks: { book: Book; quantity: number }[] = [];

            // Iterate through the books
            this.books.forEach(book => {
                // Check if the book ID already exists in uniqueBooks
                const existingBook = uniqueBooks.find(b => b.book.bookId === book.bookId);

                // If it's a new book, add it to uniqueBooks; otherwise, increment the quantity
                if (!existingBook) {
                    uniqueBooks.push({ book, quantity: 1 });
                } else {
                    existingBook.quantity++;
                }
            });

            // console.log(uniqueBooks);    
            // Convert uniqueBooks array to table format
            const tableData = uniqueBooks.map(({ book }) => ({
                Title: book.title,
                Author: book.author,
                "Book ID": book.bookId,
                Quantity: book.quantity,
                Status: book.checkedOut ? "Checked Out" : "Available",
            }));

            console.table(tableData);
        }
    }

    public searchBooks(query: string): void {
        const results = this.books.filter(
            book => book.title.toLowerCase().includes(query.toLowerCase()) ||
                book.author.toLowerCase().includes(query.toLowerCase()) ||
                book.bookId.toString().includes(query.toLowerCase())
        );

        if (results.length > 0) {
            console.log("\nSearch results:");
            const tableData = results.map(book => ({
                Title: book.title,
                Author: book.author,
                "Book ID": book.bookId,
                Quantity: book.quantity,
                Status: book.checkedOut ? "Checked Out" : "Available",
            }));

            console.table(tableData);
        } else {
            console.log("No matching books found.");
        }
    }

    public issueBook(user: IUser, bookTitle: string): void {
        // Check if the user already exists
        const existingUser = this.users.find(existingUser => existingUser.userId === user.userId);

        if (!existingUser) {
            // If the user is not in the array, add them
            this.users.push(user);
        } else {
            // Update the existing user with the current checkedOutBooks array
            user.checkedOutBooks = existingUser.checkedOutBooks;
        }

        // Continue with the book issuing logic...
        const book = this.books.find(book => book.title === bookTitle && book.quantity > 0);

        if (book) {
            // Use the updated user (either existing or newly added)
            if (user.checkedOutBooks.length < 3) {
                if (book.quantity === 1) {
                    book.checkedOut = true;
                }

                book.quantity--;
                user.checkedOutBooks.push(book);

                console.log(`${user.name}, you have successfully checked out '${book.title}' (ID: ${book.bookId}).`);
            } else {
                console.log(`${user.name}, you have reached the maximum limit of checked-out books.`);
            }
        } else {
            console.log(`Book '${bookTitle}' not available for checkout.`);
        }
    }

    public returnBook(userId: number, bookTitle: string): void {
        const returningUser = this.users.find(user => user.userId === userId);

        if (returningUser) {
            const bookIndex = returningUser.checkedOutBooks.findIndex(book => book.title === bookTitle);
            if (bookIndex !== -1) {
                const returnedBook = returningUser.checkedOutBooks.splice(bookIndex, 1)[0];
                const libraryBook = this.books.find(book => book.title === returnedBook.title);
                if (libraryBook) {
                    libraryBook.checkedOut = false;
                    libraryBook.quantity++;  // Increment the quantity when the book is returned
                    console.log(`${returningUser.name}, you have successfully returned '${returnedBook.title}' (ID: ${returnedBook.bookId}).`);
                }
            } else {
                console.log(`Book '${bookTitle}' not found in the list of checked-out books for ${returningUser.name}.`);
            }
        } else {
            console.log(`User with ID '${userId}' not found.`);
        }
    }

    public displayAllUsers() {
        console.log();
        this.users.forEach(user => {
            console.log(`${user.name}, you have ${user.checkedOutBooks.length} book(s) checked out.`);
        });

        const usersData = this.users.map((user) => {
            const booksTakenByAuthors: { [author: string]: string } = {};

            user.checkedOutBooks.forEach((book) => {
                if (!booksTakenByAuthors[book.author]) {
                    booksTakenByAuthors[book.author] = book.title;
                } else {
                    booksTakenByAuthors[book.author] += `, ${book.title}`;
                }
            });

            const booksTakenString = Object.values(booksTakenByAuthors).join(', ');

            return {
                'User ID': user.userId,
                'Name': user.name,
                'Books Taken': booksTakenString || 'None',
            };
        });

        console.log("\nUser-wise Books Taken:");
        console.table(usersData);
    }

}