"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
class Book {
    constructor(title, author, bookId, checkedOut = false, quantity = 1) {
        this.quantity = quantity;
        this._title = title;
        this._author = author;
        this._checkedOut = checkedOut;
        this._bookId = bookId;
    }
    get title() {
        return this._title;
    }
    get author() {
        return this._author;
    }
    get bookId() {
        return this._bookId;
    }
    get checkedOut() {
        return this._checkedOut;
    }
    set checkedOut(value) {
        this._checkedOut = value;
    }
}
exports.Book = Book;
