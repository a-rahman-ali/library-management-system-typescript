import { Book } from "./Book";

export interface IUser {
    userId: number;
    name: string;
    checkedOutBooks: Book[];
}

export interface IAdmin {
    addBook(title: string, author: string, bookId: number): void;
    removeBook(bookId: number): void;
}