import PromptSync from "prompt-sync";
import { LibrarySystem } from "./LibrarySystem";
import { IUser } from "./models/IUser";

// creating prompt to fetch the input from user
const prompt = PromptSync();

console.log("Welcome to my Library Management System...!");
// My Application starts from here...!
const localLibrary = new LibrarySystem();
startApp();

function startApp(): void {
    while (true) {
        displayMenu();
        const choice = parseInt(prompt("Enter your choice: "));
        // if(choice == 7){
        //     break;
        // }
        processUserInput(choice);
    }
}

function displayMenu(): void {
    console.log("\nChoose from the options below: ");
    console.log("1. Add Book");
    console.log("2. Remove Book");
    console.log("3. List Books");
    console.log("4. Search Books");
    console.log("5. Issue Book to user");
    console.log("6. Return Book to Library");
    console.log("7. List All Users");
    console.log("8. Exit");
}

function processUserInput(choice: number): void {
    if (choice === 1) {
        const title = prompt("Enter the title of the book: ");
        const author = prompt("Enter the author of the book: ");
        const bookId = parseInt(prompt("Enter the book ID:"));
        localLibrary.addBook(title, author, bookId);
    }
    else if (choice === 2) {
        const bookToRemove = parseInt(prompt("Enter the id of the book to remove: "));
        localLibrary.removeBook(bookToRemove);
    }
    else if (choice === 3) {
        localLibrary.listBooks();
    }
    else if (choice === 4) {
        const searchQuery = prompt("Enter the id or title or author of book to search: ");
        localLibrary.searchBooks(searchQuery);
    }
    else if (choice === 5) {
        const userName = prompt("Enter your name: ");
        const userId = parseInt(prompt("Enter your id: "));
        const user: IUser = { userId, name: userName, checkedOutBooks: [] };
        const bookToIssue = prompt("Enter the title of the book to issue: ");
        localLibrary.issueBook(user, bookToIssue);
    }
    else if (choice === 6) {
        const userIdToReturn = parseInt(prompt("Enter your id: "));
        const bookToReturn = prompt("Enter the title of the book to return: ");
        localLibrary.returnBook(userIdToReturn, bookToReturn);
    }
    else if (choice === 7) {
        localLibrary.displayAllUsers();
    }
    else if (choice === 8) {
        console.log("Thanks for using my Application...!!");
        process.exit(0);
    }
    else {
        console.log("\nInvalid choice. Please enter a valid option.");
    }
}


